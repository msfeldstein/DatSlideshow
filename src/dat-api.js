const DATA_FILE = 'data/data.json'
let archive = new DatArchive(window.location.origin)


export async function save(entries) {
  await archive.writeFile(DATA_FILE, JSON.stringify(entries, null, 2))
}

export async function load() {
  const json = await archive.readFile(DATA_FILE)
  const obj = JSON.parse(json)
  return obj
}