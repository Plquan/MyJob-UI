const slugify = (str: string): string =>
    str
      .normalize("NFD")                       
      .replace(/[\u0300-\u036f]/g, "")        
      .replace(/[^\w\s-]/g, "")            
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "-")          
      .replace(/^-+|-+$/g, "");          
  
  export default slugify;
  