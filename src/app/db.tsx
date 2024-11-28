import User from './models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Guide from './models/guide';
import Course from './models/course';
import File from './models/file';


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
			{email: 1, password: 1}
		);
		const returnVal = user === null ? null : user;
		return returnVal;
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

/** Used in dashboard */
export async function getCoursesWithGuides() {
  try {
    await connectMongoDB();

    const courses = await Course.find(); // Fetch all courses
    const coursesWithGuides = await Promise.all(
      courses.map(async (course) => {
        const guides = await Guide.find({ _id: { $in: course.guideIds } });
        return { ...course.toObject(), guides };
      })
    );

    return coursesWithGuides;
  } catch (error) {
    console.error('Error fetching courses with guides:', error);
    throw error;
  }
}


export async function getGuide(id: string) {
	try {
		await connectMongoDB();
		// findOne() gives one document that matches the criteria
		const guide = await Guide.findById(id)
		const returnVal = guide === null ? null : guide;
		return returnVal;
	} catch (error) {
		return NextResponse.json(
			{message: 'An error occurred while getting the user.'},
			{status: 500}
		);
	}
}
