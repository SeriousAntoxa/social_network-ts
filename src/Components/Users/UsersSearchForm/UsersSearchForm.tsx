import { Field, Form, Formik } from "formik"
import React, { FC } from "react"
import { FilterType } from "../../../redux/users-reducer"

type UsersSearchFormType = {
    onFilterChange: (filter: FilterType) => void
}

let UsersSearchForm: FC<UsersSearchFormType> = (props) => {
    const formSubmit = (
        values: FilterType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        console.log(values)
        props.onFilterChange(values)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{ term: "" }}
                validate={() => ({})}
                onSubmit={formSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />

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
