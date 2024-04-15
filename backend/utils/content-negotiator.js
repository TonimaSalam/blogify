const createError = require("../utils/create-error");

const contentNegotiator = async (data, format) => {
  switch (format) {
    case "json":
      return data;

    case "xml":
      console.log(typeof data);
      let xmlData = `<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n`;
      xmlData =
        xmlData +
        data
          .map((data) => {
            let xml = ``;
            for (let key in data) {
              xml = xml + `<${key}>${data[key]} </${key}>`;
            }
            return xml;
          })
          .join("");

      xmlData = xmlData + `</root>`;
      return xmlData;

    case "html":
      const htmldata = data
        .map((data) => {
          let html = "<div>";
          for (let key in data) {
            html = html + `<p>${key} : ${data[key]}</p>`;
          }
          html = html + "</div>";
          return html;
        })
        .join("");
      return htmldata;

    case "text":
      const textData = data
        .map((data) => {
          let text = "";
          for (let key in data) {
            text = text + `${key} : ${data[key]}\n`;
          }

          return text;
        })
        .join("\n");

      return textData;

    default:
      const error = createError(400,"Format not supported");
      throw error;
  }
};

module.exports = {
  contentNegotiator,
};
