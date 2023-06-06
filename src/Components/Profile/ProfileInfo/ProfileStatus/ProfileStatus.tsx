import React, { FC, useEffect, useState } from "react"

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    /*componentDidUpdate(prevProps, prevState) {
        if (this.props.status !== prevState.status) {
            this.setState({
                status: this.props.status,
            })
        }
    }*/

    const enableEditMode = (): void => {
        setEditMode(true)
    }

    const onStatusChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setStatus(e.currentTarget.value)
    }

    const disableEditMode = (): void => {
        setEditMode(false)
        props.updateStatus(status)
    }

    return (
        <div>
            <p>My status: </p>
            {!editMode && (
                <div>
                    <span onDoubleClick={enableEditMode}>
                        {status || "no status"}
                    </span>
                </div>
            )}
            {editMode && (
                <div>
                    <input
                        autoFocus={true}
                        onBlur={disableEditMode}
                        onChange={onStatusChange}
                        defaultValue={status}
                    />
                </div>
            )}
        </div>
    )
}

export default ProfileStatus
