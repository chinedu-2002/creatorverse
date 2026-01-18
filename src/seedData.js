import { supabase } from './client.js';

async function cleanAndSeed() {
  console.log('Cleaning database...');
  
  // Delete all existing creators
  await supabase.from('creators').delete().neq('id', 0);
  
  console.log('Adding fresh creators...');
  
  const creators = [
    {
      name: 'MrBeast',
      url: 'https://youtube.com/@MrBeast',
      description: 'Viral challenge videos, philanthropy, and giving away millions of dollars. Known for extreme stunts and heartwarming giveaways.',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/MrBeast_2023_%28cropped%29.jpg/440px-MrBeast_2023_%28cropped%29.jpg'
    },
    {
      name: 'PewDiePie',
      url: 'https://youtube.com/@PewDiePie',
      description: 'Gaming, memes, and commentary. One of the most subscribed individual creators on YouTube with over 110 million subscribers.',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/PewDiePie_at_PAX_2015.jpg/440px-PewDiePie_at_PAX_2015.jpg'
    },
    {
      name: 'Marques Brownlee',
      url: 'https://youtube.com/@mkbhd',
      description: 'High-quality tech reviews and unboxings. The best tech reviewer on YouTube with cinematic production quality.',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Collision_2023_-_Centre_Stage_-_Marques_Brownlee_-_RCZ_9285_%2853006838065%29_%28cropped%29.jpg/440px-Collision_2023_-_Centre_Stage_-_Marques_Brownlee_-_RCZ_9285_%2853006838065%29_%28cropped%29.jpg'
    },
    {
      name: 'Ninja',
      url: 'https://twitch.tv/ninja',
      description: 'Professional gaming and entertainment. Rose to fame playing Fortnite and became one of the most recognized gamers worldwide.',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Ninja_%2852900448126%29_%28cropped%29.jpg/440px-Ninja_%2852900448126%29_%28cropped%29.jpg'
    },
    {
      name: 'Pokimane',
      url: 'https://twitch.tv/pokimane',
      description: 'Gaming and Just Chatting streams. One of the most popular female streamers known for her variety content and community.',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pokimane_at_Twitchcon_Berlin_2019.png/440px-Pokimane_at_Twitchcon_Berlin_2019.png'
    }
  ];

  const { data, error } = await supabase
    .from('creators')
    .insert(creators)
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success! Added', data.length, 'creators');
  }
}

cleanAndSeed();
