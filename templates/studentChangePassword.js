exports.studentChangePassword = (email, token) => {
  return {
    Source: `ARCLAMS <contact@fabricioguardia.com>` ,
    Destination: { 
      ToAddresses: [email]
    },
    Message: {
      Subject: {
        Data: 'New Message',
        Charset: 'UTF-8'
      },
      Body: {
        Text: {
          Data: "Email service from ARCLAMS. "
            + "This email was sent from ARCLAMS"
          ,
          Charset: "UTF-8" 
        },
        Html: {
          Charset: 'UTF-8',
          Data: `
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="format-detection" content="telephone=no">
            <meta name="x-apple-disable-message-reformatting">
            <title></title>
            <style type="text/css">
              @media screen {
                @font-face {
                  font-family: 'Fira Sans';
                  font-style: normal;
                  font-weight: 300;
                  src: local(''),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruRA.woff2') format('woff2'),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKruQg.woff') format('woff');
                }
                @font-face {
                  font-family: 'Fira Sans';
                  font-style: normal;
                  font-weight: 400;
                  src: local(''),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5VflQ.woff2') format('woff2'),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vfkw.woff') format('woff');
                }
                @font-face {
                  font-family: 'Fira Sans';
                  font-style: normal;
                  font-weight: 500;
                  src: local(''),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuRA.woff2') format('woff2'),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKvuQg.woff') format('woff');
                }
                @font-face {
                  font-family: 'Fira Sans';
                  font-style: normal;
                  font-weight: 700;
                  src: local(''),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uRA.woff2') format('woff2'),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3uQg.woff') format('woff');
                }
                @font-face {
                  font-family: 'Fira Sans';
                  font-style: normal;
                  font-weight: 800;
                  src: local(''),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uRA.woff2') format('woff2'),
                  url('https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnMK7uQg.woff') format('woff');
                }
              }
            </style>
            <style type="text/css">
              #outlook a {
                padding: 0;
              }

              .ReadMsgBody,
              .ExternalClass {
                width: 100%;
              }

              .ExternalClass,
              .ExternalClass p,
              .ExternalClass td,
              .ExternalClass div,
              .ExternalClass span,
              .ExternalClass font {
                line-height: 100%;
              }

              div[style*="margin: 14px 0"],
              div[style*="margin: 16px 0"] {
                margin: 0 !important;
              }

              table,
              td {
                mso-table-lspace: 0;
                mso-table-rspace: 0;
              }

              table,
              tr,
              td {
                border-collapse: collapse;
              }

              body,
              td,
              th,
              p,
              div,
              li,
              a,
              span {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                mso-line-height-rule: exactly;
              }

              img {
                border: 0;
                outline: none;
                line-height: 100%;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
              }

              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
              }

              body {
                margin: 0;
                padding: 0;
                width: 100% !important;
                -webkit-font-smoothing: antialiased;
              }

              .pc-gmail-fix {
                display: none;
                display: none !important;
              }

              @media screen and (min-width: 621px) {
                .pc-email-container {
                  width: 620px !important;
                }
              }
            </style>
            <style type="text/css">
              @media screen and (max-width:620px) {
                .pc-sm-p-35-30 {
                  padding: 35px 30px !important
                }
              }
            </style>
            <style type="text/css">
              @media screen and (max-width:525px) {
                .pc-xs-p-25-20 {
                  padding: 25px 20px !important
                }
                .pc-xs-fs-30 {
                  font-size: 30px !important
                }
                .pc-xs-lh-42 {
                  line-height: 42px !important
                }
                .pc-xs-br-disabled br {
                  display: none !important
                }
              }
            </style>
            <!--[if mso]>
              <style type="text/css">
                  .pc-fb-font {
                      font-family: Helvetica, Arial, sans-serif !important;
                  }
              </style>
              <![endif]-->
            <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
          </head>
          <body style="width: 100% !important; margin: 0; padding: 0; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #f4f4f4" class="">
            <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">Please click on link to reset password.</div>
            <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px;">
              ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
            </div>
            <table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
              <tbody>
                <tr>
                  <td class="pc-email-body-inner" align="center" valign="top">
                    <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" src="" color="#f4f4f4"/>
                      </v:background>
                      <![endif]-->
                    <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
                    <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
                      <tbody>
                        <tr>
                          <td align="left" valign="top" style="padding: 0 10px;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                <tr>
                                  <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                            </table>
                            <!-- BEGIN MODULE: Call to Action 2 -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td class="pc-sm-p-35-30 pc-xs-p-25-20" style="padding: 40px; background-color: #ffffff; border-radius: 8px;" valign="top" bgcolor="#ffffff">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 900; line-height: 46px; letter-spacing: -0.6px; color: #151515; text-align: center;" valign="top">Forgot your password?</td>
                                        </tr>
                                        <tr>
                                          <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 300; line-height: 28px; color: #1B1B1B; letter-spacing: -0.2px;" valign="top" align="center">That's okay it happens<br><br>Click on the button below to reset your password:</td>
                                        </tr>
                                        <tr>
                                          <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td style="padding: 5px 0;" valign="top" align="center">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td style="padding: 13px 17px; border-radius: 8px; background-color: #1f72eb" bgcolor="#1f72eb" valign="top" align="center">
                                                    <a href="${process.env.CLIENT_URL}/auth/reset/student/${token}" style="line-height: 1.5; text-decoration: none; word-break: break-word; font-weight: 500; display: block; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff;">Reset Password</a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td height="15" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; color: #9B9B9B; text-align: center;" valign="top">Your request will not be processed unless you confirm a new password using this URL. This link expires in 24 hours after your original reset passworrd request.<br><br>If you did NOT request to change your password, do not click on the button.&nbsp;<br><br>Sincerely, <br><br>ARCLAMS Team</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!-- END MODULE: Call to Action 2 -->
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                <tr>
                                  <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Fix for Gmail on iOS -->
            <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
          </body>
          </html>
          `
      }
      }
    },
  }
}