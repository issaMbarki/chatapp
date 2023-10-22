export const handleMessageChange = (e,setMessage,setMessageInputHeight) => {
    let messageValue = e?.currentTarget?.value;
    if (!messageValue) {
      messageValue=e
    }
    setMessage(messageValue);
    const lineBreakCount = (messageValue.match(/\n/g) || []).length;
    if (lineBreakCount === 0) {
      setMessageInputHeight(50);
    } else if (lineBreakCount === 1) {
      setMessageInputHeight(50 + 23);
    } else if (lineBreakCount === 2) {
      setMessageInputHeight(50 + 23 * 2);
    } else if (lineBreakCount === 3) {
      setMessageInputHeight(50 + 23 * 3);
    }
  };
export  const handleKeyPress = (e,handleSendMessage) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };