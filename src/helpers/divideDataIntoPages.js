const divideDataIntoPages = (data, pageSize) => {
    const pages = [];
    const pageCount = Math.ceil(data.length / pageSize);
  
    for (let i = 0; i < pageCount; i++) {
      const startIndex = i * pageSize;
      const endIndex = startIndex + pageSize;
      const pageData = data.slice(startIndex, endIndex);
      pages.push(pageData);
    }
  
    return pages;
  };
  
  export default divideDataIntoPages;
  