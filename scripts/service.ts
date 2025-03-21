
export async function generateMetadata() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ('http://localhost' + ':' + (process.env.PORT || 3001));
    const response = await fetch(`${baseUrl}/api/single`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      myip: data.ip
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      myip: '127.0.0.1' // fallback IP
    };
  }
}

export async function getObjectsFromSupabase(storageKey: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + ':' + (process.env.PORT || 3001) + '/' : ('http://localhost' + ':' + (process.env.PORT || 3001) + '/');
  const response = await fetch(`${baseUrl}api/saveObjectsToSupabase?storageKey=${storageKey}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function saveObjectsToSupabase(objList: any[], storageKey: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + ':' + (process.env.PORT || 3001) + '/' : ('http://localhost' + ':' + (process.env.PORT || 3001) + '/');
  console.log('baseUrl', baseUrl, objList, storageKey);
  const response = await fetch(`${baseUrl}api/saveObjectsToSupabase`, {
    method: 'POST',
    body: JSON.stringify({ objList, storageKey })
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
