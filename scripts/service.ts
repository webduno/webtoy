
export async function generateMetadata() {
  try {
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ('http://localhost' + ':' + (process.env.PORT || 3001));
    const response = await fetch(`/api/single`);
    
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
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + ':' + (process.env.PORT || 3001) + '/' : ('http://localhost' + ':' + (process.env.PORT || 3001) + '/');
  const response = await fetch(`/api/saveObjectsToSupabase?storageKey=${storageKey}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function saveObjectsToSupabase(objList: any[], storageKey: string) {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + ':' + (process.env.PORT || 3001) + '/' : ('http://localhost' + ':' + (process.env.PORT || 3001) + '/');
  // console.log('baseUrl', baseUrl, objList, storageKey);
  const response = await fetch(`/api/saveObjectsToSupabase`, {
    method: 'POST',
    body: JSON.stringify({ objList, storageKey })
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}



type CompletionResponse = {
  // Define the structure of your expected response here
  // For example:
  choices?: any
  // choices?: { text: string }[];
  error?: string;
};

async function getCompletionFromAPI(prompt: string): Promise<CompletionResponse> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const data: CompletionResponse = await response.json();
  return data;
}