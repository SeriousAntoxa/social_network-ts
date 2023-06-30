import { Field, Form, Formik } from "formik"
import React, { FC } from "react"
import { FilterType } from "../../../redux/users-reducer"

type UsersSearchFormType = {
    onFilterChange: (filter: FilterType) => void
}

type FormType = {
    term: string, 
    friend: "null" | "true" | "false"
}

let UsersSearchForm: FC<UsersSearchFormType> = (props) => {
    const formSubmit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {

        const friend = values.friend === "true" ? true : values.friend === "false" ? false : null

        const filter: FilterType = {
            term: values.term,
            friend: friend
        }

        console.log(filter)
        props.onFilterChange(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{ term: "", friend: "null" }}
                validate={() => ({})}
                onSubmit={formSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field as="select" name="friend" >
                            <option value="null" defaultChecked>All</option>
                            <option value="true">Followed</option>
                            <option value="false">Unfollowd</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UsersSearchForm
