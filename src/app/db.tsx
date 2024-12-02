'use server';

import User from './models/user';
import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Guide from './models/guide';
import Course from './models/course';
import File from './models/file';
import {ObjectId} from "mongodb";
import UserGuide from './models/user-guide';


/**
 * The function connects to a MongoDB database
 * using the MONGODB_URI from the environment variables.
 */
export const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI ?? '');
	} catch (error) {
		console.error('Error connecting to MongoDB: ', error);
	}
};


/**
 * This function creates a new user in MongoDB with a hashed password and an
 * initial empty list of saved recipes.
 * @param {String} email -  Email address of the user that is being registered.
 * @param {String} password - Password that the user provides when registering.
 * This password is hashed with bcrypt before being stored for security.
 * @param name
 * @return {NextResponse} – Represents the operation's success (201 or 500).
 */
export async function createUser(email: string, password: string, name: string) {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await connectMongoDB();
		// create new user in database with no saved recipes to start
		await User.create({
			email,
			name,
			password: hashedPassword,
		});
		return NextResponse.json(
			{message: 'User registered.'},
			{status: 201}
		);
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while registering the user.'},
			{status: 500}
		);
	}
}

/**
 * The function retrieves a user's email and password from MongoDB.
 * @param {String} email - Used for getting user from the database.
 * @return {User} - Return either the user object with only the `email` and
 * `password` fields (if found in the database), or `null` if no user with the
 * specified email is found.
 *
 * If an error occurs during the process, a NextResponse with an
 * error message and status code 500 is returned.
 */
export async function getUser(email: string) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const user = await User.findOne(
			{email},
		);
		return user === null ? null : user;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the user.'},
			{status: 500}
		);
	}
}


// Guide STUFF

/** Lowkey this just is here to make some random guides */
export async function createGuide() {
	try {
		await connectMongoDB();
		// Create Dummy Guides
		await Guide.create({
			courseId: 'fdvdf',
			content: 'savafd',
			description: 'avffda',
			title: 'adfvdf'
		});
		await Course.create({
			title: 'dvssdv',
			description: 'sdvsd',
			guideIds: ['dfvdf'],
		});
		return NextResponse.json(
			{message: 'User registered.'},
			{status: 201}
		);
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while registering the user.'},
			{status: 500}
		);
	}
}

/** Lowkey this just is here to make some random file */
export async function createFile() {
	try {
		await connectMongoDB();
		// Create Dummy Guides
		await File.create({
			guideId: 'dsf',
			name: 'dsf',
			content: 'dsf',
		});
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while registering the user.'},
			{status: 500}
		);
	}
}

/** Lowkey this just is here to make some random file */
export async function getGuideFiles(guideId: string) {
	try {
		await connectMongoDB();
		return await File.find({ guideId: guideId });
	} catch (error) {
		console.error('Error fetching guides:', error);
    throw error;
	}
}

export async function getCoursesWithAuthorMeta() {
	try {
		await connectMongoDB();
		const courses = await Course.find();
		return await Promise.all(
			courses.map(async (course) => {
				const authorFull = await User.findById(new ObjectId(course.authorId));
				const {password: _, ...author} = authorFull.toObject();
				return {...course.toObject(), author};
			})
		);
	} catch (error) {
		console.error('Error fetching guides:', error);
	throw error;
	}
}

/** Used in dashboard */
export async function getCourseWithGuides(courseId: string, userId: string) {
  try {
	  console.log('userId', userId);
    await connectMongoDB();

    const courseRaw = await Course.findById(new ObjectId(courseId));

	if (!courseRaw) {
		return null;
	}

	const authorRaw = await User.findById(new ObjectId(courseRaw.authorId), { password: 0 });
	const author = authorRaw?.toObject();
	author._id = authorRaw?._id.toString();

	const course = courseRaw.toObject();
	course._id = courseRaw._id.toString();

	const guides = [];
	for (const guideId of courseRaw.guideIds) {
		const guideRaw = await Guide.findById(new ObjectId(guideId), { content: 0 });
		const guide = guideRaw?.toObject();
		guide._id = guideRaw?._id.toString();

		if (guide) {
			guides.push(guide);
		}
	}

	  const userGuideRaw = await UserGuide.findOne({ userId, courseId: course._id }, { completed: 1 });
	const userGuide = userGuideRaw?.toObject();
	const userGuideCompleted = userGuide?.completed[0] ?? {};

	return {
		...course,
		guides,
		author,
		userGuides: userGuideCompleted,
	};
  } catch (error) {
    console.error('Error fetching courses with guides:', error);
    throw error;
  }
}

/** Used in guide page */
export async function getCourseData(courseId: string) {
	try {
	  await connectMongoDB();
	  const course = await Course.findById(new ObjectId(courseId)) // Fetch all courses
	  if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }
	  const guides = await Guide.find({ _id: { $in: course.guideIds } });

    // Attach the guides as a new property
    const courseWithGuides = { ...course.toObject(), guides };
 
	  return courseWithGuides;
	} catch (error) {
	  console.error('Error fetching courses with guides:', error);
	  throw error;
	}
 }

 /** Used in guide page */
export async function getCourse(courseId: string) {
	console.log('courseId', courseId);
	try {
	  await connectMongoDB();
	  const course = await Course.findById(new ObjectId(courseId)) // Fetch all courses
	  if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }
	  return course;
	} catch (error) {
	  console.error('Error fetching courses with guides:', error);
	  throw error;
	}
 }

export async function getGuide(id: string) {
	console.log('getGuide id', id);
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const guide = await Guide.findById(new ObjectId(id))
		return guide === null ? null : guide;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the user.'},
			{status: 500}
		);
	}
}

export async function getUserGuide(userId: string, courseId: string) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const guide = await UserGuide.find({ userId: userId, courseId: courseId });
		return guide[0] ?? null;
	} catch (error) {
		return null;
	}
}


/** Lowkey this just is here to make some random guides */
export async function createUserGuide(userGuide: any) {
	try {
		await connectMongoDB();
		// Create Dummy Guides
		const hey = await UserGuide.create(userGuide);
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while registering the user.'},
			{status: 500}
		);
	}
}


export async function updateUserGuide(userId: string, courseId: string, completedObj: { [guideId: string]: boolean }, updatedFiles: { fileName: string; fileContent: string }[]) {
	console.log('completedObj', completedObj)
	try {
		await connectMongoDB();
		await UserGuide.updateOne(
			{userId: userId, courseId: courseId},
			{$set: {
				files: updatedFiles,
				completed: completedObj
			}}
		);
	} catch (error) {
		console.error('Error updating user guides', error);
	}
 }