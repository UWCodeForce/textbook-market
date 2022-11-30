'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const initialValues = {
	username: '',
	password: '',
	confirmPassword: '',
}

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Required'),
	password: Yup.string()
		.min(6, 'Too short')
		.max(20, 'Too long')
		.required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Must match password')
		.required('Required'),
})

export default function SignUp() {
	async function onSignUp(values) {
		const body = {
			username: values.username,
			password: values.confirmPassword, // could also be password
		}

		var res = await fetch('/api/register', {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})

		res = await res.json()
		console.log(res)
	}

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, actions) => {
					await onSignUp(values)
					actions.setSubmitting(false)
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<Field type='text' name='username' placeholder='JohnDoe001' />
						{touched.username && <p>{errors.username}</p>}
						<Field type='password' name='password' placeholder='password' />
						{touched.password && <p>{errors.password}</p>}
						<Field
							type='password'
							name='confirmPassword'
							placeholder='confirm password'
						/>
						{touched.confirmPassword && <p>{errors.confirmPassword}</p>}
						<button type='submit'>Submit</button>
					</Form>
				)}
			</Formik>
		</>
	)
}
