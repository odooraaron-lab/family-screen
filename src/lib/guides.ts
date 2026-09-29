// Guide pages at /<slug>. People rarely search for "a TV screen for the rest home" by name, so each
// page answers something families DO search for (sending photos to Nana, gifts for a grandparent in
// care, digital photo frames for the elderly, loneliness, dementia) and shows where the screen fits.
// Rules: genuinely useful, NZ voice, honest. No invented statistics, no medical claims, cite sources.
// {monthly} and {yearly} are replaced with the live price labels.
export type Guide = {
  slug: string;
  nav: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  intro: string;
  tv: { msg: string; from: string; time?: string };
  sections: { h2: string; body: string[]; list?: string[] }[];
  ideas?: { h: string; p: string }[];
  faq: [string, string][];
  sources?: { name: string; url: string }[];
  related: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'send-photos-to-grandparents',
    nav: 'Send photos to Nana & Poppa',
    title: 'Send Photos to Nana & Poppa’s TV, Even in a Rest Home | Resthome TV NZ',
    description: 'Keep Nana and Poppa updated with the grandkids. Send photos, videos and messages from your phone and they appear on the TV in their room. No app, nothing for them to learn.',
    kicker: 'Keep Nana & Poppa in the loop',
    h1: 'Send photos of the grandkids straight to Nana and Poppa’s TV',
    intro: 'The grandkids grow up fast, and the family group chat moves faster than Nana can scroll. If she’s in a rest home, or just doesn’t get on with smartphones, she can miss the lot. Send your photos to the TV in her room instead: big, clear, with your name on it, and nothing for her to press.',
    tv: { msg: 'Look Nana, I lost my first tooth! The tooth fairy gave me $2.', from: 'From Ari, 6', time: 'Tuesday 3:40' },
    sections: [
      {
        h2: 'Why the TV works when phones and tablets don’t',
        body: [
          'Most of the ways we share photos, like group chats, Facebook, and cloud albums, quietly assume the other person has a smartphone, remembers a password and knows where to tap. Many grandparents don’t, especially after a move into care, with changing eyesight or shaky hands.',
          'The TV is different. It’s already in the room, it’s big, and everyone knows how it works. With Resthome TV, the photos just appear on it: new ones first with a soft chime and the sender’s name in big letters, then everything keeps cycling through the day.',
        ],
      },
      {
        h2: 'How it works',
        body: [],
        list: [
          'One family member sets up a screen for Nana in about five minutes and connects her TV with a 6-digit code.',
          'They share a send link (or a printed QR card) with the rest of the family: aunties, cousins, grandkids, old friends.',
          'Anyone approved can send a photo, a short video or a written note from their phone. No app to download.',
          'It plays on Nana’s TV within seconds, with a clock always on screen and the screen dimming to a big clock at night.',
        ],
      },
      {
        h2: 'Made for the whole whānau',
        body: ['Everyone sends from their own phone, so Nana hears from the cousins in Australia, the grandkids after school and her sister in Timaru, not only from whoever visits. You approve each new person once, and you can remove anything at any time.'],
      },
    ],
    ideas: [
      { h: 'After-school snaps', p: 'A quick photo at the school gate. Nana gets to be part of an ordinary Tuesday.' },
      { h: 'Sport and performances', p: 'A goal, a certificate, the school production. Short videos play right on the TV.' },
      { h: 'Handwritten notes', p: 'Photograph a drawing or a card the kids made. It looks great on a big screen.' },
      { h: 'Milestones', p: 'First steps, lost teeth, new school shoes, a new baby in the family.' },
    ],
    faq: [
      ['Does Nana need a smartphone or an app?', 'No. Everything plays on the TV in her room. She doesn’t press anything.'],
      ['Do the grandkids need an app?', 'No. They send from a web link on any phone, with a parent’s approval the first time.'],
      ['How much does it cost?', 'One subscription per TV: {monthly} or {yearly}. Everyone in the family sends for free.'],
    ],
    related: ['what-to-send-nana', 'stay-in-touch-with-grandparents-in-rest-home', 'gifts-for-nana-in-rest-home'],
  },
  {
    slug: 'what-to-send-nana',
    nav: 'What to send Nana: ideas',
    title: '40 Things to Send Nana & Poppa: Photo Ideas for the Grandkids | Resthome TV',
    description: 'Not sure what to send your grandparents? 40 simple photo, video and message ideas for grandkids to keep Nana and Poppa updated, especially in a rest home.',
    kicker: 'Ideas for the grandkids',
    h1: '40 things the grandkids can send Nana and Poppa',
    intro: 'Grandparents rarely want polished photos. They want to feel part of everyday life: what you ate, what you made, where you went, what made you laugh. Here are simple ideas for mokopuna of every age, and for the grown-ups too.',
    tv: { msg: 'We made your pikelet recipe! Not as good as yours though.', from: 'From Mia & Leo', time: 'Saturday 10:05' },
    sections: [
      {
        h2: 'Everyday moments (the ones they miss most)',
        body: [],
        list: ['The walk to school', 'What’s in the lunchbox', 'A new haircut', 'The pet doing something silly', 'Rainy-day huts made of couch cushions', 'The view from the car on a road trip', 'Dinner you cooked together', 'Bedtime story, read to camera'],
      },
      {
        h2: 'Things they made',
        body: [],
        list: ['A drawing or painting of Nana', 'Lego creations', 'Baking, especially one of Nana’s recipes', 'A card for a birthday or Mother’s Day', 'Garden veggies you grew', 'A school project', 'A dance routine (a short video)', 'A song learned on the recorder or ukulele'],
      },
      {
        h2: 'Milestones and big days',
        body: [],
        list: ['First day of school or a new school', 'Lost teeth', 'Certificates and awards', 'Sports games, goals and prizegivings', 'Kapa haka, school productions and recitals', 'Birthdays and blowing out candles', 'Swimming badges', 'A new baby in the family'],
      },
      {
        h2: 'Memories they’ll love',
        body: [],
        list: ['An old family photo you found', 'A place they used to live or holiday', 'A photo of their old school, church or marae', 'Their favourite beach today', 'A recipe of theirs you still use', 'A “this reminded me of you” photo', 'The family bach', 'Their old car, house or garden'],
      },
      {
        h2: 'Quick messages that make their day',
        body: [],
        list: ['“Good morning Nana!”', '“Thinking of you”', '“Can’t wait to see you on Sunday”', '“Guess what happened today…”', 'A question they can answer at your next visit', 'A photo of the weather where you are', 'A thank-you for something they taught you', '“Love you Poppa” in the kids’ own writing'],
      },
      {
        h2: 'Tips for photos that look great on a TV',
        body: [],
        list: ['Hold the phone sideways (landscape) so it fills the screen', 'Get close: faces matter more than backgrounds', 'Keep videos short: under a minute is perfect', 'Add a line of text so Nana knows what she’s looking at', 'Little and often beats a big album once a month'],
      },
    ],
    faq: [
      ['How often should we send something?', 'Little and often works best. A photo or two a few times a week keeps the screen fresh and gives Nana something new to look forward to.'],
      ['Can young kids send by themselves?', 'A parent approves each new sender once. After that, kids can send from a family phone or tablet using the send link.'],
      ['Can we send videos?', 'Yes, short videos play on the TV. Keep them under a minute and a half.'],
    ],
    related: ['send-photos-to-grandparents', 'stay-in-touch-with-grandparents-in-rest-home', 'gifts-for-nana-in-rest-home'],
  },
  {
    slug: 'digital-photo-frame-for-elderly',
    nav: 'Digital photo frame for elderly',
    title: 'Digital Photo Frame for Elderly Parents in a Rest Home? Try the TV | Resthome TV',
    description: 'Looking for a digital photo frame for Nana in aged care? See how a frame compares with using the TV already in her room: screen size, setup, messages and who can send.',
    kicker: 'Digital photo frames vs the TV',
    h1: 'A digital photo frame for Nana, or the TV she already has?',
    intro: 'Wi-Fi photo frames are a popular gift for elderly parents, and for good reason: family send photos from an app and they appear in the frame. If your parent is in a rest home, though, the TV on the wall might do the job better. Here’s an honest comparison.',
    tv: { msg: 'Happy birthday Mum! The whole family is at the beach thinking of you.', from: 'From Sarah in Brisbane', time: 'Friday 11:20' },
    sections: [
      {
        h2: 'What’s great about digital photo frames',
        body: ['They’re a one-off purchase, they sit on a bedside table or dresser, they don’t need a TV, and many let the whole family send photos from an app. For someone living at home with good eyesight and reliable Wi-Fi, a frame can be a lovely gift.'],
      },
      {
        h2: 'Where frames can struggle in a rest home',
        body: [],
        list: [
          'Size: a typical 10-inch frame is hard to see from a bed or armchair across the room.',
          'Setup in the room: someone has to connect the frame to the facility Wi-Fi, and redo it if the network changes.',
          'Who sent it: most frames show the photo but not a big, clear name, so Nana can’t tell who it’s from.',
          'Words: short written messages (“Good luck at your appointment, Mum”) aren’t what frames are built for.',
          'Space: bedside tables in care are often already full.',
        ],
      },
      {
        h2: 'Why the TV can work better',
        body: [
          'The TV is already there, it’s big, and it’s where Nana naturally looks. With Resthome TV, family send photos, short videos and written messages from a link on their phone, with no app, and each one plays with the sender’s name in large letters and a soft chime. A clock is always on screen, and at night it dims to a big, easy-to-read clock.',
          'The trade-off: it’s a small subscription ({monthly}) rather than a one-off purchase, and it needs a TV with a web browser or a cheap streaming stick. If your parent doesn’t have a TV in their room, a frame may be the better choice.',
        ],
      },
    ],
    faq: [
      ['Is it better than a digital photo frame?', 'It depends. If there’s a TV in the room, a TV is bigger, shows who sent each photo, plays messages and short videos, and needs no app for the family. If there’s no TV, a frame is a good choice.'],
      ['Does it need the rest home’s Wi-Fi?', 'Yes, like a Wi-Fi frame, the TV needs an internet connection. Most rest homes offer Wi-Fi to residents. It keeps playing what it has if the connection drops.'],
      ['Is there anything for Nana to do?', 'No. It plays by itself. The TV just needs to be on.'],
    ],
    related: ['send-photos-to-grandparents', 'gifts-for-nana-in-rest-home', 'family-photos-and-dementia'],
  },
  {
    slug: 'stay-in-touch-with-grandparents-in-rest-home',
    nav: 'Staying in touch with a grandparent in care',
    title: 'How to Stay in Touch with a Grandparent in a Rest Home (NZ Guide) | Resthome TV',
    description: 'Practical ways to stay connected with Nana or Poppa in a rest home, especially if they can’t use a phone: visits, calls, letters, photos, video messages and the TV in their room.',
    kicker: 'A practical guide',
    h1: 'How to stay in touch with a grandparent in a rest home',
    intro: 'Moving into care often means Nana or Poppa sees family less, just when it matters most. Visits are precious, but the days in between can be long. Here are practical ways to stay connected, including ideas for grandparents who can’t use a phone.',
    tv: { msg: 'Good morning Poppa! See you Sunday for the rugby.', from: 'From James', time: 'Thursday 8:30' },
    sections: [
      {
        h2: '1. Make visits count',
        body: ['Short, regular visits often mean more than long, rare ones. Bring something to talk about: photos, a newspaper from their home town, something the grandkids made. Visit at a time of day when they’re at their best, and bring the kids when you can.'],
      },
      {
        h2: '2. Phone and video calls, with a little help',
        body: ['If your grandparent can’t manage a phone, ask the staff about a regular call time. Many rest homes can help set up a video call on a tablet. Keep calls short and at the same time each week so there’s something to look forward to.'],
      },
      {
        h2: '3. Letters, cards and parcels',
        body: ['Post still delivers joy. A card from the grandkids, a printed photo or a small parcel is something they can hold, show off and keep. Big, clear handwriting helps.'],
      },
      {
        h2: '4. Photos and short videos on the TV',
        body: ['For the in-between days, Resthome TV lets the whole family send photos, videos and written messages from their phones to the TV in their room. They play with a soft chime and the sender’s name in large letters, with nothing for your grandparent to press. It turns an ordinary Tuesday into “look what the grandkids sent me”.'],
      },
      {
        h2: '5. Share the load across the family',
        body: ['Staying in touch shouldn’t fall on one person. Make a simple roster for visits and calls, and share the send link so cousins, aunties and friends overseas can all be part of it.'],
      },
      {
        h2: '6. Talk to the staff',
        body: ['The care team knows your grandparent’s routine, good times of day and what they enjoy. Ask what helps, and let them know about big family news so they can chat about it too.'],
      },
    ],
    faq: [
      ['How can I stay in touch with Nana if she can’t use a phone?', 'Regular visits, cards, calls arranged through the rest home staff, and sending photos and messages to the TV in her room, which needs nothing from her.'],
      ['How often should I visit a grandparent in a rest home?', 'Whatever you can keep up. Short, regular visits usually matter more than long, rare ones, and messages in between keep the connection going.'],
      ['Can family overseas stay involved?', 'Yes. With a send link, family anywhere in the world can send photos and messages that play on the TV within seconds.'],
    ],
    related: ['loneliness-in-rest-homes', 'send-photos-to-grandparents', 'what-to-send-nana'],
  },
  {
    slug: 'gifts-for-nana-in-rest-home',
    nav: 'Gifts for Nana in a rest home',
    title: 'Gift Ideas for Nana or Poppa in a Rest Home (NZ) | Resthome TV',
    description: 'Thoughtful gift ideas for a grandparent in a rest home or aged care in New Zealand, from comfort and treats to photos and a gift that keeps arriving all year.',
    kicker: 'Gift guide',
    h1: 'Gift ideas for Nana or Poppa in a rest home',
    intro: 'Buying for a grandparent in care is tricky: space is limited, they may not need more “things”, and what they really want is time with family. Here are ideas that actually get used, from small comforts to gifts that keep the family close.',
    tv: { msg: 'Merry Christmas Nana! Your present is this screen. We’ll fill it up all year.', from: 'From all the grandkids', time: 'Christmas Day 9:00' },
    sections: [
      {
        h2: 'Comfort',
        body: [],
        list: ['A soft throw blanket or lap rug', 'Warm non-slip slippers or bed socks', 'A cosy dressing gown', 'A good hand cream or lip balm', 'A cushion for their favourite chair'],
      },
      {
        h2: 'Treats',
        body: [],
        list: ['Their favourite biscuits, chocolates or lollies (check any dietary needs with the staff first)', 'Nice tea, a special mug that’s easy to hold', 'NZ honey or a jar of good jam', 'Fresh flowers or an easy-care pot plant'],
      },
      {
        h2: 'Things to do',
        body: [],
        list: ['Large-print books, puzzles or crosswords', 'Audiobooks or a simple radio', 'A jigsaw with big pieces', 'Colouring books and pencils', 'A bird feeder outside the window, if the rest home allows'],
      },
      {
        h2: 'Family and memories',
        body: [],
        list: ['A printed photo book, with names written under each face', 'A calendar with family birthdays and photos', 'A recorded message or song from the grandkids', 'A framed photo of the whole family'],
      },
      {
        h2: 'The gift that keeps arriving',
        body: ['A Resthome TV subscription turns the TV in their room into a window on the family. After the presents are opened, the photos, videos and messages keep coming, from every grandchild, cousin and friend, all year. It’s {yearly}, and you can give it as a gift from the whole family.'],
      },
    ],
    faq: [
      ['What do you buy someone in a rest home who has everything?', 'Time and connection. Visits, calls and a steady stream of family photos and news usually mean more than another object. Small comforts and treats are good too.'],
      ['What about a big birthday party for Nana?', 'For an 80th or 90th, our sister site Wishcast (myqr.co.nz/tv-slideshow) makes a slideshow of photos through the years that plays on any TV at the party.'],
      ['Can I give Resthome TV as a gift?', 'Yes. Set it up in their name, connect their TV on your next visit, and share the send link with the family.'],
      ['What’s a good Christmas or Mother’s Day gift for Nana in care?', 'Something personal and practical: a photo book with names, a cosy blanket, her favourite treats, or a subscription that sends her family photos all year.'],
    ],
    related: ['send-photos-to-grandparents', 'digital-photo-frame-for-elderly', 'what-to-send-nana'],
  },
  {
    slug: 'loneliness-in-rest-homes',
    nav: 'Loneliness in rest homes',
    title: 'Loneliness in Rest Homes: How Families Can Help (NZ) | Resthome TV',
    description: 'Loneliness and boredom are common in aged residential care. What families in New Zealand can do to help a grandparent feel connected, with links to NZ research and support.',
    kicker: 'Wellbeing',
    h1: 'Loneliness in rest homes, and how families can help',
    intro: 'Moving into care can mean losing a home, a neighbourhood, friends and independence all at once. New Zealand research with rest home residents describes loneliness and boredom as common. Families can’t fix everything, but small, regular contact makes a real difference to how connected someone feels.',
    tv: { msg: 'Hi Mum, the kōwhai you planted is flowering. Thought you’d like to see it.', from: 'From Karen', time: 'Wednesday 2:10' },
    sections: [
      {
        h2: 'Why it happens',
        body: ['Residents often describe loss as the hardest part: of home, routines, friends who’ve passed away, and family who live far away or are busy with work and kids. Days in care can have long quiet stretches between meals and activities.'],
      },
      {
        h2: 'What helps',
        body: [],
        list: [
          'Regular contact, even brief. Frequent small moments beat occasional big ones.',
          'Things to look forward to: a Sunday visit, a weekly call, news from the grandkids.',
          'Staying part of family life: hearing about the ordinary things, not only the big events.',
          'Familiar faces and places: photos of people and places they love.',
          'Meaningful activity: hobbies, visitors, and the rest home’s activities programme.',
        ],
      },
      {
        h2: 'How Resthome TV fits in',
        body: ['It fills the gaps between visits. The whole family, including people who live overseas, can send photos, videos and messages that play on the TV in the room with a soft chime and the sender’s name. There’s nothing for the resident to learn. It isn’t a replacement for visits, but it can mean hearing from family every day instead of every few weeks.'],
      },
      {
        h2: 'Where to find support',
        body: ['If you’re worried about a family member’s wellbeing, talk to the rest home’s care team first. Age Concern New Zealand runs visiting services in many areas, and Loneliness NZ has information and research about loneliness in older people.'],
      },
    ],
    faq: [
      ['Is loneliness common in rest homes?', 'New Zealand research with residents describes loneliness and boredom as common, often linked to the losses that come with moving into care.'],
      ['How can I help a lonely grandparent in a rest home?', 'Keep in regular contact, give them things to look forward to, share everyday family news and photos, and talk with the care team about activities and visiting services.'],
      ['Does it replace visiting?', 'No. It fills the days between visits, so your grandparent hears from family more often.'],
    ],
    sources: [
      { name: 'Loneliness and boredom in residential care: voices of older adults (Aotearoa NZ Social Work)', url: 'https://anzswjournal.nz/anzsw/article/view/846' },
      { name: 'Age Concern New Zealand: loneliness and social isolation research', url: 'https://www.ageconcern.org.nz/Public/Info/Research/Loneliness_and_Social_Isolation_Research.aspx' },
      { name: 'Loneliness NZ: profile of loneliness among older adults', url: 'https://loneliness.org.nz/nz/research/profile-of-loneliness-among-older-adults/' },
      { name: 'NZ Herald: aged-care providers battle loneliness', url: 'https://www.nzherald.co.nz/kahu/aged-care-providers-battle-loneliness-as-new-zealand-population-ages/LSI33IEDNCP2HVUUXSY7QXCZ6Y/' },
    ],
    related: ['stay-in-touch-with-grandparents-in-rest-home', 'send-photos-to-grandparents', 'for-rest-homes'],
  },
  {
    slug: 'family-photos-and-dementia',
    nav: 'Family photos & dementia',
    title: 'Family Photos for Someone with Dementia: Gentle Tips for Families | Resthome TV',
    description: 'Sharing family photos with a parent or grandparent living with dementia: gentle tips on labelling faces, keeping it calm, and using the TV in their room.',
    kicker: 'Dementia & families',
    h1: 'Sharing family photos with someone living with dementia',
    intro: 'Many families find that familiar faces, places and voices bring comfort and conversation to someone living with dementia. Here are gentle, practical tips for sharing photos, plus how the TV in their room can help. Every person is different, so talk with their care team about what suits them.',
    tv: { msg: 'Hi Mum, it’s Jane, your daughter. Here’s Tom and the kids at the lake.', from: 'From Jane (your daughter)', time: 'Monday 10:30' },
    sections: [
      {
        h2: 'Tips for sharing photos',
        body: [],
        list: [
          'Say who’s who: “It’s Jane, your daughter” is easier than expecting them to remember.',
          'Keep it simple: one clear photo at a time, faces close up.',
          'Older memories are often clearer: photos from years ago can spark lovely conversations.',
          'Calm over busy: gentle, happy moments rather than crowded or noisy scenes.',
          'Go with their mood: if something seems to upset them, leave it out.',
          'Short videos with a familiar voice can be comforting for some people.',
        ],
      },
      {
        h2: 'Why a big screen with names can help',
        body: ['Resthome TV shows each photo with the sender’s name in large letters, like “From Jane (your daughter)”, so your parent doesn’t have to work out who it is. New messages play with a soft chime, then everything cycles calmly, and a clock is always on screen. At night the screen dims to a big clock, so it doesn’t disturb sleep. Nothing needs pressing.'],
      },
      {
        h2: 'A few cautions',
        body: ['Resthome TV isn’t a medical device or therapy. Check with the care team about screen time, volume and night-time settings, and remove anything that isn’t helping. You can remove any message from the family page at any time.'],
      },
      {
        h2: 'Support in New Zealand',
        body: ['Dementia New Zealand and Alzheimers New Zealand offer information and support for families, including local groups and advisors.'],
      },
    ],
    faq: [
      ['Do family photos help people with dementia?', 'Many families find familiar faces and places bring comfort and conversation. Everyone is different, so watch how your loved one responds and talk with their care team.'],
      ['Can I change the name shown with each photo?', 'Each sender adds their name, and can write something like “Jane (your daughter)” so it’s clear who they are.'],
      ['Will it disturb them at night?', 'You choose quiet hours. During that time the screen dims to a big, calm clock.'],
    ],
    sources: [
      { name: 'Dementia New Zealand', url: 'https://dementia.nz/' },
      { name: 'Alzheimers New Zealand', url: 'https://alzheimers.org.nz/' },
    ],
    related: ['digital-photo-frame-for-elderly', 'stay-in-touch-with-grandparents-in-rest-home', 'loneliness-in-rest-homes'],
  },
  {
    slug: 'for-rest-homes',
    nav: 'For rest homes & aged care',
    title: 'Family Photo Screens for Rest Homes & Aged Care Providers NZ | Resthome TV',
    description: 'Help residents stay connected with family, with nothing for staff to manage. Families send photos and messages to the TV in each room. Talk to us about your rest home.',
    kicker: 'For aged care providers',
    h1: 'Keep residents connected with family, with nothing for staff to manage',
    intro: 'Families want to feel close, and staff are stretched. Resthome TV lets families send photos, videos and messages from their phones to the TV in their relative’s room, while the care team doesn’t have to do anything except keep the TV on.',
    tv: { msg: 'Happy 90th Grandad! Look at all your great-grandkids.', from: 'From the Wilson family', time: 'Saturday 1:00' },
    sections: [
      {
        h2: 'What it means for residents',
        body: ['A steady stream of family photos and news on a screen they already know how to watch. Big text, one thing at a time, a clock always showing, and a dim clock at night.'],
      },
      {
        h2: 'What it means for families',
        body: ['A simple way for the whole family, including relatives overseas, to stay part of daily life, and a reason to keep sending between visits. Families can see when their message has played.'],
      },
      {
        h2: 'What it means for staff',
        body: [],
        list: ['Nothing to install or manage', 'No tablets to charge or book', 'Families approve their own senders and moderate their own screen', 'Private: nothing is public or searchable'],
      },
      {
        h2: 'Offer it to every room',
        body: ['We can set up a screen for each resident whose family wants one, with one invoice for the facility, or families can subscribe themselves. Get in touch and we’ll work out what suits you.'],
      },
    ],
    faq: [
      ['What do staff need to do?', 'Keep the TV on and on the right input. Families do everything else from their phones.'],
      ['What TVs does it work with?', 'Any smart TV with a web browser, or any TV with a Chromecast or Fire TV Stick.'],
      ['Is resident privacy protected?', 'Screens are private to each family. Only approved family members can send, and nothing is public or searchable.'],
    ],
    related: ['loneliness-in-rest-homes', 'stay-in-touch-with-grandparents-in-rest-home', 'family-photos-and-dementia'],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
