function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars.charAt(randomIndex);
    }
  
    return code;
  }
  
module.exports=generateCode;