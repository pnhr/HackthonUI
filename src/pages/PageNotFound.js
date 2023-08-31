import { Alert } from 'antd'
import React from 'react'

export const PageNotFound = () => {
  return (
    <div style={{ padding:'1em' }}>
          <Alert message="Page Not Found!" description="The requested page was not found!" type="error" showIcon />
    </div>
  )
}
