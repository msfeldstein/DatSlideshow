export default async function(file) {
  return new Promise((ok, notok) => {
    const reader = new FileReader()
    reader.onload = () => {
      ok(reader.result)
    } 
    reader.readAsArrayBuffer(file) 
  })
  
}