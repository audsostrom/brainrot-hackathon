/**
 * Form field for entering email and password
 */
export function Form({action, children}: any) {
	return (
		<form
			action={action}
		>
						<div>
				<label
					htmlFor="name"
				>
          Name
				</label>
				<input
					id="name"
					name="name"
					type="text"
					placeholder="Enter name"
					autoComplete="name"
					required
				/>
			</div>
			<div>
				<label
					htmlFor="email"
				>
          Email Address
				</label>
				<input
					id="email"
					name="email"
					type="email"
					placeholder="Enter email address"
					autoComplete="email"
					required
				/>
			</div>
			<div>
				<label
					htmlFor="password"
				>
          Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Enter password"
					required
				/>
			</div>
			{children}
		</form>
	);
}