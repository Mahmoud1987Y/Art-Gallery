exports.mailTemplate = (text, link, linkText) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 80%;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h1>RESET PASSWORD</h1>
              </div>
              <div class="email-body">
                <p>${text}</p>
                <a href="google.com">Google</a>
                
                <a style="font-size:15px;" href="${link}">${linkText}</a>
              </div>
              <div class="email-footer">
                <p>Thank you</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};