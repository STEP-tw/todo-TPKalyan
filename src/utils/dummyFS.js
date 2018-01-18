class fs {
  constructor(validFiles) {
    this.validFiles = validFiles || [];
  }
  addValidFile(filePath){
    this.validFiles.push(filePath);
  }
  existsSync(filePath){
    return this.validFiles(filePath);
  }
}
