import {Storage} from "aws-amplify"


export async function s3Upload(file){
  const filename = `${Date.now()}-${file.name}`;
  console.log(filename)

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  })

  return stored.key
}

export async function s3Delete(key){
 const removed =  Storage.remove(key, {level: 'private'})
 return removed
}