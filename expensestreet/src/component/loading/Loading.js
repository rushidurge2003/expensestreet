import React from 'react'

export const Loading = () => {
    return (
        <div class="d-flex justify-content-center" style={{
            position:"relative",
            top:200
        }}>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
