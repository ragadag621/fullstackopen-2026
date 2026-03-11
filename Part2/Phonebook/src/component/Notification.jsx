const Notification = ({ message, messageType }) => {
  console.log("Notification rendered")
  if (message === null) {
    return null
  }

  const notificationStyle = messageType === 'error' ? 'notification error' : 'notification success'

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification