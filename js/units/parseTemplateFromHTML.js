const parseTemplateFromHTML = (html) => {
  let template = document.createElement(`div`);
  template.innerHTML = html;
  return template;
};

export default parseTemplateFromHTML;
