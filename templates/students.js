exports.inviteStudentEmail = (email, token, firstName, username, password) => {
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
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
                .pc-sm-p-24-20-30 {
                  padding: 24px 20px 30px !important
                }
                .pc-sm-p-35-10-15 {
                  padding: 35px 10px 15px !important
                }
                .pc-sm-mw-50pc {
                  max-width: 50% !important
                }
                .pc-sm-p-21-10-14 {
                  padding: 21px 10px 14px !important
                }
                .pc-sm-h-20 {
                  height: 20px !important
                }
                .pc-sm-mw-100pc {
                  max-width: 100% !important
                }
              }
            </style>
            <style type="text/css">
              @media screen and (max-width:525px) {
                .pc-xs-p-15-10-20 {
                  padding: 15px 10px 20px !important
                }
                .pc-xs-h-100 {
                  height: 100px !important
                }
                .pc-xs-br-disabled br {
                  display: none !important
                }
                .pc-xs-fs-30 {
                  font-size: 30px !important
                }
                .pc-xs-lh-42 {
                  line-height: 42px !important
                }
                .pc-xs-p-25-0-5 {
                  padding: 25px 0 5px !important
                }
                .pc-xs-mw-100pc {
                  max-width: 100% !important
                }
                .pc-xs-p-5-0 {
                  padding: 5px 0 !important
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
            <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0; font-size: 1px; line-height: 1px; color: #151515;">ARCLAMS has invited you to register.</div>
            <div style="display: none !important; visibility: hidden; opacity: 0; overflow: hidden; mso-hide: all; height: 0; width: 0; max-height: 0; max-width: 0;">
              ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
            </div>
            <table class="pc-email-body" width="100%" bgcolor="#f4f4f4" border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed;">
              <tbody>
                <tr>
                  <td class="pc-email-body-inner" align="center" valign="top">
                    <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" src="" color="#f4f4f4"></v:fill>
                      </v:background>
                      <![endif]-->
                    <!--[if (gte mso 9)|(IE)]><table width="620" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td width="620" align="center" valign="top"><![endif]-->
                    <table class="pc-email-container" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto; max-width: 620px;">
                      <tbody>
                        <tr>
                          <td align="left" valign="top" style="padding: 0 10px;">
                            <!-- BEGIN MODULE: Header 1 -->
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                              <tbody>
                                <tr>
                                  <td background="https://images.unsplash.com/photo-1567473030492-533b30c5494c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" bgcolor="#1B1B1B" valign="top" style="background-color: #1B1B1B; background-image: url('https://images.unsplash.com/photo-1567473030492-533b30c5494c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'); background-position: top center; background-size: cover; border-radius: 8px">
                                    <!--[if gte mso 9]>
                      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                          <v:fill type="frame" src="https://images.unsplash.com/photo-1567473030492-533b30c5494c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" color="#1B1B1B"></v:fill>
                          <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                              <div style="font-size: 0; line-height: 0;">
                                  <table width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center">
                                      <tr>
                                          <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                  <tr>
                                                      <td colspan="3" height="24" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                      <td width="30" valign="top" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                      <td valign="top" align="left">
                      <![endif]-->
                                    <!--[if !gte mso 9]><!-->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td class="pc-sm-p-24-20-30 pc-xs-p-15-10-20" valign="top" style="padding: 24px 30px 40px;">
                                            <!--<![endif]-->
                                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                                      <tbody>
                                                        <tr>
                                                          <td valign="top" style="padding: 10px; line-height: 18px; font-family: Helvetica, sans-serif; font-size: 14px;">
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td class="pc-xs-h-100" height="80" style="line-height: 1px; font-size: 1px">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                  <td class="pc-fb-font" valign="top" style="padding: 0 10px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #020202"></td>
                                                </tr>
                                                <tr>
                                                  <td class="pc-xs-fs-30 pc-xs-lh-42 pc-fb-font pc-xs-br-disabled" valign="top" style="padding: 13px 10px 0; letter-spacing: -0.7px; line-height: 46px; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; color: #ffffff">
                                                    <div style="background-color: rgba(104, 104, 104, .4); padding: 15px 30px; border-radius: 20px; color: #151515;">Hello, ${firstName}</div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <!--[if !gte mso 9]><!-->
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--<![endif]-->
                                    <!--[if gte mso 9]>
                                                      </td>
                                                      <td width="30" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                      <td colspan="3" height="40" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                  </tr>
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                          </v:textbox>
                      </v:rect>
                      <![endif]-->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!-- END MODULE: Header 1 -->
                            <!-- BEGIN MODULE: Feature 1 -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                              <tbody>
                                <tr>
                                  <td height="8" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                </tr>
                              </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                              <tbody>
                                <tr>
                                  <td class="pc-sm-p-35-10-15 pc-xs-p-25-0-5" style="padding: 40px 20px; background-color: #ffffff; border-radius: 8px" valign="top" bgcolor="#ffffff">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; line-height: 34px; letter-spacing: -0.4px; color: #151515; padding: 0 20px;" valign="top">
                                            You've been invited to register with ARCLAMS
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="10" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                        <tr>
                                          <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 300; line-height: 28px; letter-spacing: -0.2px; color: #151515; padding: 0 20px;" valign="top">
                                            <p>
                                              We have received a request to authorize this email address for use with ARCLAMS. Please take a minute to complete your registration by verifying your email address:</p>
                                            <br>
                                            <p>
                                              Your temporary username: <span style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #EB9F1B; padding: 0 5px;">${username}</span>
                                            </p>
                                            <p>
                                              Your temporary login password: <span style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; color: #EB9F1B; padding: 0 5px;">${password}</span></p>
                                            <br>
                                            <div style="padding: 13px 17px; border-radius: 8px; background-color: #00b7ec" valign="top" align="center">
                                            <a href="${process.env.CLIENT_URL}/auth/activate/student/${token}" style="line-height: 1.5; text-decoration: none; word-break: break-word; font-weight: 500; display: block; font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff;">Activate Account</a>
                                            </div>
                                            <!-- <a href="{{clientURL}}/auth/activate/{{token}}" class="verify">Confirm Email</a> -->
                                          </td>
                                        </tr>
                                        <tr>
                                          <td class="pc-fb-font" style="font-family: 'Fira Sans', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 28px; letter-spacing: -0.2px; color: #151515; padding: 0 20px;" valign="top">
                                            <p>
                                              This url will will expire in 24 hours.</p>
                                            <br>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="20" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                                        </tr>
                                      </tbody>
                                      <tbody>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!-- END MODULE: Feature 1 -->
                            <!-- BEGIN MODULE: Footer 1 -->
                            
                            <!-- END MODULE: Footer 1 -->
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