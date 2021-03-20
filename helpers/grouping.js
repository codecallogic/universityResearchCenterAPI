exports.groupingHeaderData = (body) => {
  const {headline1, headline2, headline3, headline4, headline5, headline6} = body.header
  let headlines = new Array(headline1, headline2, headline3, headline4, headline5, headline6)

  const {subheading1, subheading2, subheading3, subheading4, subheading5, subheading6} = body.header
  let subheadings = new Array(subheading1, subheading2, subheading3, subheading4, subheading5, subheading6)

  const {button1, button2, button3, button4, button5, button6} = body.header
  let buttons = new Array(button1, button2, button3, button4, button5, button6)

  const {imageLeftColumn1, imageLeftColumn2, imageLeftColumn3, imageLeftColumn4, imageLeftColumn5, imageLeftColumn6} = body.header
  let imagesLeftColumn = new Array(imageLeftColumn1, imageLeftColumn2, imageLeftColumn3, imageLeftColumn4, imageLeftColumn5, imageLeftColumn6)

  const {imageRightColumn1, imageRightColumn2, imageRightColumn3, imageRightColumn4, imageRightColumn5, imageRightColumn6} = body.header
  let imagesRightColumn = new Array(imageRightColumn1, imageRightColumn2, imageRightColumn3, imageRightColumn4, imageRightColumn5, imageRightColumn6)

  const {caption_1_1, caption_1_2, caption_1_3, caption_1_4, caption_1_5, caption_1_6} = body.header
  let captionsOne = new Array(caption_1_1, caption_1_2, caption_1_3, caption_1_4, caption_1_5, caption_1_6)

  const {caption_2_1, caption_2_2, caption_2_3, caption_2_4, caption_2_5, caption_2_6} = body.header
  let captionsTwo = new Array(caption_2_1, caption_2_2, caption_2_3, caption_2_4, caption_2_5, caption_2_6)

  return {headlines, subheadings, buttons, imagesLeftColumn, imagesRightColumn, captionsOne, captionsTwo}
}