import {
  RegionalLanguageCode,
  VernacularLanguage,
  VernacularModule,
  JargonTerm,
} from '../types/finance';

export const SUPPORTED_LANGUAGES: VernacularLanguage[] = [
  { code: 'en', label: 'English', native_name: 'English', flag_or_badge: 'EN' },
  { code: 'hi', label: 'Hindi', native_name: 'हिन्दी', flag_or_badge: 'HI' },
  { code: 'ta', label: 'Tamil', native_name: 'தமிழ்', flag_or_badge: 'TA' },
  { code: 'te', label: 'Telugu', native_name: 'తెలుగు', flag_or_badge: 'TE' },
  { code: 'mr', label: 'Marathi', native_name: 'मराठी', flag_or_badge: 'MR' },
  { code: 'bn', label: 'Bengali', native_name: 'বাংলা', flag_or_badge: 'BN' },
  { code: 'kn', label: 'Kannada', native_name: 'ಕನ್ನಡ', flag_or_badge: 'KN' },
];

export const VERNACULAR_MODULES: VernacularModule[] = [
  {
    id: 'mod_tax_harvesting',
    topic: 'Tax Optimization',
    duration_seconds: 68,
    level: 'Beginner',
    title: {
      en: 'Tax-Loss Harvesting: Turn Portfolio Dips into Tax Refunds',
      hi: 'टैक्स-लॉस हार्वेस्टिंग: घाटे को टैक्स बचत में कैसे बदलें',
      ta: 'வரி இழப்பு அறுவடை: நஷ்டத்தை வரி சேமிப்பாக மாற்றுவது எப்படி?',
      te: 'ట్యాక్స్-లాస్ హార్వెస్టింగ్: నష్టాన్ని పన్ను ఆదాతో భర్తీ చేయండి',
      mr: 'टॅक्स-लॉस हार्वेस्टिंग: नुकसानीचे कर बचतीत रूपांतर कसे करावे',
      bn: 'ট্যাক্স-লস হার্ভেস্টিং: ক্ষতিকে ট্যাক্স সাশ্রয়ে রূপান্তর করুন',
      kn: 'ತೆರಿಗೆ ನಷ್ಟ ಹಾರ್ವೆಸ್ಟಿಂಗ್: ನಷ್ಟವನ್ನು ತೆರಿಗೆ ಉಳಿತಾಯವನ್ನಾಗಿ ಪರಿವರ್ತಿಸಿ',
    },
    summary: {
      en: 'Learn how selling loss-making stocks before March 31 offsets your capital gains tax at 20%, keeping your profits intact.',
      hi: 'जानें कि कैसे 31 मार्च से पहले घाटे वाले शेयर बेचकर 20% कैपिटल गेन टैक्स बचाया जा सकता है।',
      ta: 'மார்ச் 31-க்கு முன் நஷ்டமுள்ள பங்குகளை விற்று 20% மூலதன ஆதாய வரியை எவ்வாறு மிச்சப்படுத்துவது என்று தெரிந்து கொள்ளுங்கள்.',
      te: 'మార్చి 31లోపు నష్టాల్లో ఉన్న షేర్లను విక్రయించడం ద్వారా 20% క్యాపిటల్ గెయిన్స్ పన్నును ఎలా ఆదా చేయాలో నేర్చుకోండి.',
      mr: '३१ मार्चपूर्वी तोट्यातील शेअर्स विकून २०% भांडवली नफा कर कसा वाचवायचा ते शिका.',
      bn: 'জানুন কিভাবে ৩১শে মার্চের আগে লোকসানের স্টক বিক্রি করে ২০% ক্যাপিটাল গেইন ট্যাক্স বাঁচানো যায়।',
      kn: 'ಮಾರ್ಚ್ 31 ಕ್ಕಿಂತ ಮೊದಲು ನಷ್ಟದಲ್ಲಿರುವ ಷೇರುಗಳನ್ನು ಮಾರಿ 20% ಕ್ಯಾಪಿಟಲ್ ಗೇನ್ಸ್ ತೆರಿಗೆ ಉಳಿಸುವುದು ಹೇಗೆ ಎಂದು ತಿಳಿಯಿರಿ.',
    },
    script_transcript: {
      en: 'Did you know? In India, short-term stock gains are taxed at 20%. But if you have an unrealized loss in your portfolio, you can sell those shares before March 31 to cancel out your gains. You can immediately reinvest into a similar index ETF so your money stays invested. That is Tax-Loss Harvesting!',
      hi: 'क्या आप जानते हैं? भारत में शॉर्ट टर्म कैपिटल गेन पर 20% टैक्स लगता है। लेकिन अगर आपके पोर्टफोलियो में कुछ शेयर घाटे में हैं, तो 31 मार्च से पहले उन्हें बेचकर आप अपने मुनाफे वाले टैक्स को शून्य या बहुत कम कर सकते हैं। फिर तुरंत उसी सेक्टर के ईटीएफ में निवेश करके मार्केट में बने रह सकते हैं। इसे कहते हैं टैक्स-लॉस हार्वेस्टिंग!',
      ta: 'உங்களுக்குத் தெரியுமா? இந்தியாவில் குறுகிய கால பங்கு ஆதாயங்களுக்கு 20% வரி உண்டு. ஆனால் உங்கள் போர்ட்ஃபோலியோவில் நஷ்டம் இருந்தால், மார்ச் 31-க்குள் அந்த பங்குகளை விற்று உங்கள் ஆதாய வரியை குறைக்கலாம்! உடனே அதேபோன்ற ETF-ல் முதலீடு செய்து சந்தையிலும் தொடரலாம்.',
      te: 'మీకు తెలుసా? భారతదేశంలో స్వల్పకాలిక స్టాక్ లాభాలపై 20% పన్ను ఉంటుంది. కానీ మీ పోర్ట్‌ఫోలియోలో నష్టాలు ఉంటే, మార్చి 31 లోపు వాటిని విక్రయించడం ద్వారా పన్ను ఆదా చేసుకోవచ్చు. ఆ వెంటనే ఇండెక్స్ ఇటిఎఫ్‌లో మళ్లీ పెట్టుబడి పెట్టవచ్చు.',
      mr: 'भारतात अल्पमुदतीच्या नफ्यावर २०% कर लागतो. पण जर तुमच्या पोर्टफोलिओमध्ये काही तोटा असेल, तर ३१ मार्चपूर्वी ते शेअर्स विकून तुम्ही नफ्यावरील कर वाचवू शकता आणि लगेच इंडेक्स फंडात पुन्हा गुंतवू शकता.',
      bn: 'ভারতে স্বল্পমেয়াদী স্টক লাভের উপর ২০% ট্যাক্স দিতে হয়। তবে আপনার পোর্টফোলিওতে লস থাকলে ৩১শে মার্চের আগে বিক্রি করে ট্যাক্স কমাতে পারেন এবং সমতুল্য ইনডেক্স ফান্ডে পুনরায় বিনিয়োগ করতে পারেন।',
      kn: 'ಭಾರತದಲ್ಲಿ ಅಲ್ಪಾವಧಿ ಷೇರು ಲಾಭಕ್ಕೆ 20% ತೆರಿಗೆ ಇರುತ್ತದೆ. ಆದರೆ ನಿಮ್ಮ ಖಾತೆಯಲ್ಲಿ ನಷ್ಟದ ಷೇರುಗಳಿದ್ದರೆ, ಮಾರ್ಚ್ 31 ಕ್ಕಿಂತ ಮುಂಚಿತವಾಗಿ ಮಾರಿ ತೆರಿಗೆಯನ್ನು ಉಳಿಸಬಹುದು ಮತ್ತು ತಕ್ಷಣವೇ ಇಂಡೆಕ್ಸ್ ಇಟಿಎಫ್‌ನಲ್ಲಿ ಮರುಹೂಡಿಕೆ ಮಾಡಬಹುದು.',
    },
    audio_narrative_text: {
      en: 'Tax loss harvesting is a legal strategy under Indian tax law. Selling underwater assets before financial year end creates an official loss book that directly cancels your taxable gains. Reallocating into broad market ETFs ensures zero downtime in your compounding journey.',
      hi: 'टैक्स लॉस हार्वेस्टिंग भारतीय आयकर कानून के तहत एक बेहद समझदारी भरा कदम है। वित्तीय वर्ष समाप्त होने से पहले घाटे वाले शेयर बेचकर आप टैक्स देनदारी घटा सकते हैं।',
      ta: 'வரி இழப்பு அறுவடை என்பது இந்திய வரி விதிகளின்படி முற்றிலும் சட்டபூர்வமானது. நிதி ஆண்டு முடிவதற்குள் நஷ்டத்தை பதிவு செய்து மூலதன ஆதாய வரியை குறைக்கலாம்.',
      te: 'ట్యాక్స్ లాస్ హార్వెస్టింగ్ ద్వారా ఆర్థిక సంవత్సరం ముగిసేలోపు నష్టాలను నమోదు చేసి మీరు చెల్లించాల్సిన క్యాపిటల్ గెయిన్స్ పన్నును గణనీయంగా తగ్గించుకోవచ్చు.',
      mr: 'आर्थिक वर्ष संपण्यापूर्वी तोटा बुक करून नफ्यावरील कर कमी करणे म्हणजेच टॅक्स लॉस हार्वेस्टिंग. हा पूर्णपणे कायदेशीर मार्ग आहे.',
      bn: 'ট্যাক্স লস হার্ভেস্টিং আর্থিক বছর শেষ হওয়ার আগে লোকসান বুক করে মুনাফার উপর ট্যাক্স কমানোর একটি বৈধ এবং স্মার্ট কৌশল।',
      kn: 'ತೆರಿಗೆ ನಷ್ಟ ಹಾರ್ವೆಸ್ಟಿಂಗ್ ಮೂಲಕ ಆರ್ಥಿಕ ವರ್ಷ ಮುಗಿಯುವ ಮುನ್ನ ನಷ್ಟ ಬುಕ್ ಮಾಡಿ ಲಾಭದ ಮೇಲಿನ ತೆರಿಗೆಯನ್ನು ಉಳಿಸಿಕೊಳ್ಳಬಹುದು.',
    },
    key_takeaways: {
      en: [
        'Short-term capital loss (STCL) can offset both STCG and LTCG',
        'Long-term capital loss (LTCL) can offset only LTCG',
        'Deadline is March 31 of each financial year',
        'Avoid market exit by rolling into correlated ETFs',
      ],
      hi: [
        'शॉर्ट-टर्म लॉस (STCL) से STCG और LTCG दोनों को ऑफसेट कर सकते हैं',
        'लॉन्ग-टर्म लॉस (LTCL) से केवल LTCG ऑफसेट होता है',
        'अंतिम तारीख प्रत्येक वर्ष 31 मार्च होती है',
        'पैसे को बाहर रखने के बजाय संबंधित ETF में दोबारा लगाएं',
      ],
      ta: [
        'குறுகிய கால நஷ்டம் (STCL) மூலம் குறுகிய மற்றும் நீண்ட கால ஆதாயங்களை ஈடுகட்டலாம்',
        'நீண்ட கால நஷ்டம் (LTCL) மூலம் நீண்ட கால ஆதாயத்தை மட்டுமே ஈடுகட்ட முடியும்',
        'ஒவ்வொரு ஆண்டும் மார்ச் 31 கடைசி நாள்',
        'பணத்தை வெளியே எடுக்காமல் தொடர்புடைய ETF-ல் முதலீடு செய்யுங்கள்',
      ],
      te: [
        'STCL ద్వారా STCG మరియు LTCG రెండింటినీ భర్తీ చేయవచ్చు',
        'LTCL ద్వారా కేవలం LTCG మాత్రమే భర్తీ అవుతుంది',
        'చివరి తేదీ ప్రతి సంవత్సరం మార్చి 31',
        'మార్కెట్ నుంచి బయటకు రాకుండా ఇటిఎఫ్‌లలో తిరిగి పెట్టుబడి పెట్టండి',
      ],
      mr: [
        'शॉर्ट-टर्म तोट्याने STCG आणि LTCG दोन्ही कमी करता येतात',
        'लॉन्ग-टर्म तोट्याने फक्त LTCG कमी करता येतो',
        'अंतिम मुदत प्रत्येक वर्षी ३१ मार्च असते',
        'मार्केटबाहेर न पडता संबंधित ETF मध्ये लगेच पुनर्गुंतवणूक करा',
      ],
      bn: [
        'শর্ট টার্ম লস দিয়ে STCG এবং LTCG উভয়ই অফসেট করা যায়',
        'লং টার্ম লস দিয়ে কেবল LTCG অফসেট হয়',
        'প্রতি বছর ৩১শে মার্চ হল ডেডলাইন',
        'বাজার থেকে বের না হয়ে সমজাতীয় ETF-এ বিনিয়োগ করুন',
      ],
      kn: [
        'STCL ನಿಂದ STCG ಮತ್ತು LTCG ಎರಡನ್ನೂ ಸರಿದೂಗಿಸಬಹುದು',
        'LTCL ನಿಂದ ಕೇವಲ LTCG ಮಾತ್ರ ಸರಿದೂಗಿಸಬಹುದು',
        'ಪ್ರತಿ ವರ್ಷದ ಮಾರ್ಚ್ 31 ಕೊನೆಯ ದಿನಾಂಕ',
        'ಸಂಬಂಧಿತ ETF ಗಳಲ್ಲಿ ತಕ್ಷಣ ಮರುಹೂಡಿಕೆ ಮಾಡಿ',
      ],
    },
    quiz: {
      question: {
        en: 'Can Short-Term Capital Loss (STCL) be set off against Long-Term Capital Gains (LTCG)?',
        hi: 'क्या शॉर्ट-टर्म कैपिटल लॉस (STCL) को लॉन्ग-टर्म कैपिटल गेन (LTCG) के खिलाफ सेट ऑफ किया जा सकता है?',
        ta: 'குறுகிய கால மூலதன நஷ்டத்தை (STCL) நீண்ட கால மூலதன ஆதாயத்திற்கு (LTCG) எதிராக ஈடுசெய்ய முடியுமா?',
        te: 'స్వల్పకాలిక మూలధన నష్టాన్ని (STCL) దీర్ಘకాలిక మూలధన లాభాలకు (LTCG) వ్యతిరేకంగా సర్దుబాటు చేయవచ్చా?',
        mr: 'शॉर्ट-टर्म कॅपिटल लॉस (STCL) ला लाँग-टर्म कॅपिटल गेन (LTCG) विरुद्ध सेट ऑफ करता येते का?',
        bn: 'শর্ট টার্ম ক্যাপিটাল লস কি লং টার্ম ক্যাপিটাল গেইনের বিপরীতে সমন্বয় করা যায়?',
        kn: 'ಅಲ್ಪಾವಧಿ ಬಂಡವಾಳ ನಷ್ಟವನ್ನು (STCL) ದೀರ್ಘಾವಧಿ ಬಂಡವಾಳ ಲಾಭಕ್ಕೆ (LTCG) ಎದುರಾಗಿ ಸರಿದೂಗಿಸಬಹುದೇ?',
      },
      options: {
        en: ['Yes, STCL can offset both STCG and LTCG', 'No, STCL can only offset STCG', 'Only if approved by IT officer', 'Never allowed in India'],
        hi: ['हाँ, STCL से STCG और LTCG दोनों ऑफसेट हो सकते हैं', 'नहीं, केवल STCG ऑफसेट हो सकता है', 'केवल आयकर अधिकारी की अनुमति से', 'भारत में कभी अनुमति नहीं है'],
        ta: ['ஆம், STCL குறுகிய மற்றும் நீண்ட கால இரண்டையும் ஈடுசெய்யும்', 'இல்லை, STCG-ஐ மட்டுமே', 'வருமான வரி அதிகாரி அனுமதித்தால் மட்டும்', 'இந்தியாவில் அனுமதிக்கப்படுவதில்லை'],
        te: ['అవును, STCL రెండింటినీ ఆఫ్‌సెట్ చేస్తుంది', 'కాదు, STCG మాత్రమే', 'అధికారి అనుమతి ఉంటేనే', 'ఎప్పుడూ అనుమతించబడదు'],
        mr: ['होय, STCL ने STCG आणि LTCG दोन्ही सेट ऑफ होतात', 'नाही, फक्त STCG होतो', 'फक्त अधिकाऱ्यांच्या परवानगीने', 'भारतात अनुमती नाही'],
        bn: ['হ্যাঁ, STCL উভয়ের সঙ্গেই অফসেট করা যায়', 'না, কেবল STCG-র সাথে', 'আয়কর অফিসারের অনুমতি থাকলে', 'ভারতে কোনোদিনই সম্ভব নয়'],
        kn: ['ಹೌದು, STCL ಎರಡನ್ನೂ ಸರಿದೂಗಿಸಬಹುದು', 'ಇಲ್ಲ, ಕೇವಲ STCG ಮಾತ್ರ', 'ಅಧಿಕಾರಿಯ ಅನುಮತಿಯಿದ್ದರೆ ಮಾತ್ರ', 'ಅನುಮತಿಯಿಲ್ಲ'],
      },
      correct_option_index: 0,
      explanation: {
        en: 'Under Section 70 of the Indian Income Tax Act, Short-Term Capital Loss can be set off against both STCG and LTCG. However, LTCL can only be set off against LTCG.',
        hi: 'भारतीय आयकर अधिनियम की धारा 70 के तहत, शॉर्ट-टर्म लॉस को STCG और LTCG दोनों के खिलाफ सेट ऑफ किया जा सकता है।',
        ta: 'இந்திய வருமான வரிச் சட்டம் பிரிவு 70-ன் படி, குறுகிய கால நஷ்டத்தை STCG மற்றும் LTCG இரண்டிற்கும் எதிராக ஈடுசெய்யலாம்.',
        te: 'భారత ఆదాయపు పన్ను చట్టం సెక్షన్ 70 ప్రకారం, STCL ను STCG మరియు LTCG రెండింటికి ఎదురుగా సర్దుబాటు చేయవచ్చు.',
        mr: 'भारतीय आयकर कायद्याच्या कलम ७० नुसार, शॉर्ट-टर्म लॉस दोन्ही प्रकारच्या नफ्याविरुद्ध सेट ऑफ करता येतो.',
        bn: 'আয়কর আইনের ধারা ৭০ অনুযায়ী, স্বল্পমেয়াদী লোকসান উভয় মুনাফার বিপরীতে সমন্বয় করা সম্ভব।',
        kn: 'ಭಾರತೀಯ ಆದಾಯ ತೆರಿಗೆ ಕಾಯಿದೆಯ ಸೆಕ್ಷನ್ 70 ರ ಅಡಿಯಲ್ಲಿ, STCL ಅನ್ನು ಎರಡಕ್ಕೂ ಸರಿದೂಗಿಸಬಹುದು.',
      },
    },
  },
  {
    id: 'mod_upi_spare_change',
    topic: 'Micro-Investing',
    duration_seconds: 52,
    level: 'Beginner',
    title: {
      en: 'UPI Spare Change: Turn Daily Swiggy & Chai into 24K Gold',
      hi: 'UPI चिल्लर निवेश: चाय और स्विगी के बिल से बनाएं खरा सोना',
      ta: 'UPI சில்லறை முதலீடு: தினசரி டீ, காபி செலவிலிருந்து தங்கச் சேமிப்பு',
      te: 'యూపీఐ చిల్లర పెట్టుబడి: రోజువారీ టీ, స్విగ్గీ ఖర్చులతో బంగారం కొనండి',
      mr: 'UPI सुट्टे पैसे बचत: रोजच्या चहा आणि जेवणातून २४ कॅरेट सोने कमवा',
      bn: 'UPI খুচরো বিনিয়োগ: দৈনন্দিন চা ও সুইগির খরচ থেকে ডিজিটাল গোল্ড',
      kn: 'UPI ಚಿಲ್ಲರೆ ಹೂಡಿಕೆ: ದಿನನಿತ್ಯದ ಚಹಾ ಮತ್ತು ಸ್ವಿಗ್ಗಿ ಬಿಲ್‌ನಿಂದ ಚಿನ್ನ ಸಂಪಾದಿಸಿ',
    },
    summary: {
      en: 'Automatically round up every ₹34 chai to ₹50 and sweep the ₹16 difference into 24K Digital Gold or Liquid Funds.',
      hi: 'हर ₹34 की चाय पर ₹50 तक राउंड-अप करें और बचा हुआ ₹16 डिजिटल गोल्ड या लिक्विड फंड में निवेश करें।',
      ta: 'ஒவ்வொரு ₹34 டீ பில்லையும் ₹50-ஆக உயர்த்தி, மிஞ்சிய ₹16-ஐ தானாக 24K தங்கத்தில் முதலீடு செய்யுங்கள்.',
      te: 'మీరు చేసే ప్రతి చిన్న ఖర్చును రౌండ్-అప్ చేసి మిగిలిన చిల్లరను స్వయంచಾಲితంగా డిజిటల్ గోల్డ్‌లో జమ చేయండి.',
      mr: 'प्रत्येक बिलावर उरलेले सुट्टे पैसे आपोआप लिक्विड फंड किंवा २४ कॅरेट सोन्यात गुंतवा.',
      bn: 'দৈনন্দিন কেনাকাটার খুচরো পয়সা স্বয়ংক্রিয়ভাবে ডিজিটাল সোনায় জমা করে ভবিষ্যৎ সঞ্চয় গড়ে তুলুন।',
      kn: 'ಪ್ರತಿ ದಿನದ ಸಣ್ಣ ಖರ್ಚುಗಳ ಚಿಲ್ಲರೆಯನ್ನು ಆಟೋಮ್ಯಾಟಿಕ್ ಆಗಿ ಡಿಜಿಟಲ್ ಗೋಲ್ಡ್‌ನಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಿ.',
    },
    script_transcript: {
      en: 'Every time you scan a QR code for ₹85 or order on Zomato for ₹382, you leave pocket change behind. With Nivesha UPI Micro-Rounding, we round to ₹100 or ₹400 and sweep ₹15 or ₹18 straight into 24K Digital Gold. Just ₹45 a day compounds to over ₹1,20,000 in 5 years without noticing!',
      hi: 'जब भी आप ₹85 की कॉफी पीते हैं या जोमैटो पर ₹382 का खाना मंगाते हैं, निवेषा इसे ₹100 या ₹400 में राउंड कर देता है। बचा हुआ ₹15 या ₹18 सीधे आपके 24K डिजिटल गोल्ड या लिक्विड फंड में चला जाता है। दिन के मात्र ₹45 पांच साल में ₹1,20,000 से अधिक बन जाते हैं!',
      ta: 'நீங்கள் ₹85 காபி குடித்தாலோ, ₹382 உணவு ஆர்டர் செய்தாலோ, நிவேஷா அதை ₹100 அல்லது ₹400-ஆக மாற்றி மிச்ச தொகையை தங்கமாக மாற்றுகிறது. தினமும் ₹45 சேமித்தால் 5 ஆண்டுகளில் ₹1.2 லட்சத்திற்கும் மேல் சேரும்!',
      te: 'మీరు ₹85 కాఫీ తాగినా లేదా ₹382 ఖర్చు చేసినా, మిగిలిన మొత్తాన్ని నివేషా నేరుగా 24 క్యారెట్ల డిజిటల్ బంగారంలో జమ చేస్తుంది.',
      mr: 'दररोजच्या छोट्या खर्चातील सुट्टे पैसे आपोआप सोन्यात गुंतवून ५ वर्षांत १ लाखाहून अधिक निधी तयार करा.',
      bn: 'প্রতিটি লেনদেনের অতিরিক্ত খুচরো টাকা সরাসরি ডিজিটাল গোল্ডে চলে যায়, যা অজান্তেই বড় সম্পদে পরিণত হয়।',
      kn: 'ದಿನನಿತ್ಯದ ಚಿಲ್ಲರೆ ಹಣವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಹೂಡಿಕೆ ಮಾಡುವ ಮೂಲಕ ಸುಲಭವಾಗಿ ಆಸ್ತಿ ನಿರ್ಮಿಸಬಹುದು.',
    },
    audio_narrative_text: {
      en: 'Micro-investing removes friction from saving. By turning every UPI transaction into a micro-investment trigger, your daily expenses literally fund your wealth building.',
      hi: 'माइक्रो-इन्वेस्टिंग आपकी रोजमर्रा की आदतों को बिना किसी अतिरिक्त बोझ के बचत और निवेश में बदल देती है।',
      ta: 'சிறு முதலீட்டு முறை சேமிப்பை எளிதாக்குகிறது. உங்கள் அன்றாட செலவுகளே உங்கள் எதிர்கால முதலீடாக மாறுகின்றன.',
      te: 'మైక్రో ఇన్వెస్టింగ్ మీ రోజువారీ ఖర్చుల ద్వారానే ఆటోమేటిక్‌గా పెద్ద సంపదను సృష్టించడానికి సహాయపడుతుంది.',
      mr: 'मायक्रो-इन्व्हेस्टिंगमुळे बचतीची सवय विनासायास लागते आणि सुट्ट्या पैशातून मोठी संपत्ती तयार होते.',
      bn: 'মাইক্রো-ইনভেস্টিং আপনার প্রতিদিনের খরচ থেকেই সঞ্চয় গড়ে তুলতে সাহায্য করে।',
      kn: 'ಮೈಕ್ರೋ ಇನ್ವೆಸ್ಟಿಂಗ್ ಮೂಲಕ ದಿನನಿತ್ಯದ ಚಿಲ್ಲರೆಯೇ ಭವಿಷ್ಯದ ದೊಡ್ಡ ಹೂಡಿಕೆಯಾಗುತ್ತದೆ.',
    },
    key_takeaways: {
      en: [
        'Round up daily UPI bills to nearest ₹10 or ₹50',
        'Direct sweep into 99.9% pure 24K Digital Gold or Liquid Reserves',
        'T+0 instant liquidity whenever you need cash back',
        'Accelerate savings with 2x or 3x multiplier boosts',
      ],
      hi: [
        'दैनिक बिलों को नजदीकी ₹10 या ₹50 तक राउंड अप करें',
        'सीधे 99.9% शुद्ध 24 कैरेट डिजिटल गोल्ड में स्वचालित जमा',
        'आवश्यकता पड़ने पर तुरंत पैसे निकालने की सुविधा',
        '2x या 3x मल्टीप्लायर से बचत की रफ्तार बढ़ाएं',
      ],
      ta: [
        'தினசரி பில்களை ₹10 அல்லது ₹50-க்கு ரவுண்ட் அப் செய்யுங்கள்',
        'நேரடியாக 24K சுத்தமான தங்கத்தில் முதலீடு',
        'தேவைப்படும்போது உடனே பணமாக மாற்றும் வசதி',
        '2x அல்லது 3x பூஸ்ட் மூலம் வேகமான சேமிப்பு',
      ],
      te: [
        'రోజువారీ బిల్లులను ₹10 లేదా ₹50 కి రౌండ్ అప్ చేయండి',
        'స్వచ్ఛమైన 24 క్యారెట్ డిజిటల్ బంగారంలో ఆటో-స్వీప్',
        'ఎప్పుడైనా వెనక్కి తీసుకునే సదుపాయం',
        '2x లేదా 3x బూస్టర్‌తో వేగవంతమైన వృద్ధి',
      ],
      mr: [
        'रोजचे बिल जवळच्या ₹१० किंवा ₹५० ला राउंड करा',
        '२४ कॅरेट शुद्ध डिजिटल सोन्यात थेट गुंतवणूक',
        'गरज भासल्यास त्वरित पैसे परत मिळण्याची सुविधा',
        '२x किंवा ३x मल्टीप्लायरने बचतीचा वेग वाढवा',
      ],
      bn: [
        'দৈনিক বিল নিকটতম ১০ বা ৫০ টাকায় রাউন্ড আপ করুন',
        '২৪ ক্যারেট খাঁটি ডিজিটাল সোনায় সরাসরি সঞ্চয়',
        'প্রয়োজনে তাৎক্ষণিক টাকা তোলার সুবিধা',
        '২x বা ৩x গুণকের মাধ্যমে দ্রুত বৃদ্ধি',
      ],
      kn: [
        'ದೈನಂದಿನ ಖರ್ಚನ್ನು ₹10 ಅಥವಾ ₹50 ಕ್ಕೆ ರೌಂಡ್ ಅಪ್ ಮಾಡಿ',
        '24K ಶುದ್ಧ ಡಿಜಿಟಲ್ ಚಿನ್ನದಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತ ಹೂಡಿಕೆ',
        'ಯಾವಾಗ ಬೇಕಾದರೂ ಹಣ ಹಿಂಪಡೆಯುವ ಸೌಲಭ್ಯ',
        '2x ಅಥವಾ 3x ಬೂಸ್ಟ್‌ನೊಂದಿಗೆ ವೇಗದ ಉಳಿತಾಯ',
      ],
    },
    quiz: {
      question: {
        en: 'If you buy groceries for ₹234 with a ₹50 round-up rule, how much is invested?',
        hi: 'यदि आप ₹50 राउंड-अप नियम के साथ ₹234 का सामान खरीदते हैं, तो कितना निवेश होगा?',
        ta: '₹50 ரவுண்ட்-அப் விதியில் ₹234-க்கு பொருள் வாங்கினால், எவ்வளவு முதலீடு செய்யப்படும்?',
        te: '₹50 రౌండ్-అప్ నియమంతో ₹234 కి కిరాణా కొంటే ఎంత పెట్టుబడి అవుతుంది?',
        mr: '₹५० च्या राउंड-अप नियमाने ₹२३४ ची खरेदी केल्यास किती रक्कम गुंतवली जाईल?',
        bn: '৫০ টাকার রাউন্ড-আপ নিয়মে ২৩৪ টাকার বাজার করলে কত বিনিয়োগ হবে?',
        kn: '₹50 ರೌಂಡ್ ಅಪ್ ನಿಯಮದೊಂದಿಗೆ ₹234 ಖರ್ಚು ಮಾಡಿದರೆ ಎಷ್ಟು ಹೂಡಿಕೆಯಾಗುತ್ತದೆ?',
      },
      options: {
        en: ['₹16 (rounded to ₹250)', '₹6 (rounded to ₹240)', '₹50 flat', '₹34'],
        hi: ['₹16 (₹250 तक राउंड)', '₹6 (₹240 तक राउंड)', '₹50 सीधा', '₹34'],
        ta: ['₹16 (₹250 ஆக)', '₹6 (₹240 ஆக)', '₹50 நிலையானது', '₹34'],
        te: ['₹16 (₹250 రౌండ్)', '₹6 (₹240 రೌండ్)', '₹50 నేరుగా', '₹34'],
        mr: ['₹१६ (₹२५० पर्यंत)', '₹६ (₹२४० पर्यंत)', '₹५० फिक्स', '₹३४'],
        bn: ['১৬ টাকা (২৫০ টাকায় রাউন্ড)', '৬ টাকা (২৪০ টাকায়)', '৫০ টাকা নির্দিষ্ট', '৩৪ টাকা'],
        kn: ['₹16 (₹250 ಕ್ಕೆ ರೌಂಡ್)', '₹6 (₹240 ಕ್ಕೆ)', '₹50 ಫಿಕ್ಸ್', '₹34'],
      },
      correct_option_index: 0,
      explanation: {
        en: '₹234 rounds up to the next multiple of ₹50, which is ₹250. The difference (₹250 - ₹234 = ₹16) is swept into your chosen pool.',
        hi: '₹234 का अगला ₹50 का गुणक ₹250 है। अंतर (₹250 - ₹234 = ₹16) आपके निवेश पूल में जमा होता है।',
        ta: '₹234-க்கு அடுத்த ₹50 மடங்கு ₹250. வித்தியாசம் ₹16 தங்கத்தில் சேமிக்கப்படும்.',
        te: '₹234 కు తదుపరి ₹50 గుణకం ₹250. వ్యత్యాసం ₹16 పెట్టుబడిగా మారుతుంది.',
        mr: '२३४ रुपयांची पुढील ५० ची पट २५० आहे. फरक (२५० - २३४ = १६) गुंतवला जातो.',
        bn: '২৩৪ টাকার পরবর্তী ৫০ এর গুণিতক হলো ২৫০ টাকা। বাকি ১৬ টাকা বিনিয়োগ হয়।',
        kn: '₹234 ರ ಮುಂದಿನ ₹50 ಗುಣಕ ₹250 ಆಗಿದೆ. ಉಳಿದ ₹16 ಹೂಡಿಕೆಯಾಗುತ್ತದೆ.',
      },
    },
  },
  {
    id: 'mod_alt_fractional',
    topic: 'Alternative Assets',
    duration_seconds: 64,
    level: 'Intermediate',
    title: {
      en: 'Fractional Real Estate & Bonds: High Yields for Every Pocket',
      hi: 'फ्रैक्शनल रियल एस्टेट और बॉन्ड्स: छोटे बजट में बड़ा किराया और ब्याज',
      ta: 'பின்ன ரியல் எஸ்டேட் மற்றும் பாண்டுகள்: குறைந்த முதலீட்டில் அதிக லாபம்',
      te: 'ఫ్రాక్షనల్ రియల్ ఎస్టేట్ & బాండ్లు: తక్కువ పెట్టుబడితో ఎక్కువ రాబడి',
      mr: 'फ्रॅक्शनल रिअल इस्टेट व कॉर्पोरेट बाँड्स: छोट्या रकमेत नियमित भाडे व व्याज',
      bn: 'ভগ্নাংশ রিয়েল এস্টেট ও বন্ড: ছোট বাজেটে বড় রিটার্ন ও নিয়মিত আয়',
      kn: 'ಫ್ರ್ಯಾಕ್ಷನಲ್ ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಮತ್ತು ಬಾಂಡ್‌ಗಳು: ಕಡಿಮೆ ಬಂಡವಾಳದಲ್ಲಿ ಹೆಚ್ಚು ಲಾಭ',
    },
    summary: {
      en: 'Why settle for 6% fixed deposits when institutional tech parks and CRISIL AA corporate bonds offer 9% to 14% yields with ₹1,000 to ₹5,000 entry?',
      hi: 'जब टेक पार्क और एए-रेटेड बॉन्ड ₹1,000 से ₹5,000 में 9% से 14% का रिटर्न दे रहे हैं, तो सिर्फ 6% एफडी में क्यों रुकें?',
      ta: '₹1,000 முதல் ₹5,000 வரையிலான குறைந்த முதலீட்டில் 9% முதல் 14% வரை வருமானம் தரும் கமர்ஷியல் ரியல் எஸ்டேட் மற்றும் பாண்டுகள் பற்றி தெரிந்து கொள்ளுங்கள்.',
      te: 'రూ. 1,000 తోనే భారీ ఐటీ పార్కులు మరియు ప్రముఖ కార్పొరేట్ బాండ్లలో పెట్టుబడి పెట్టి 9% నుండి 14% రాబడి పొందండి.',
      mr: 'मोठ्या आयटी पार्क्स व सुरक्षित कॉर्पोरेट बाँड्समध्ये अवघ्या ₹१,००० ते ₹५,००० मध्ये गुंतवणूक करून ९% ते १४% परतावा मिळवा.',
      bn: 'মাত্র ১,০০০ থেকে ৫,০০০ টাকায় বড় বাণিজ্যিক ভবন ও কর্পোরেট বন্ডে বিনিয়োগ করে ৯% থেকে ১৪% নিয়মিত আয় করুন।',
      kn: 'ಕೇವಲ ₹1,000 ರಿಂದ ₹5,000 ದೊಂದಿಗೆ ಕಮರ್ಷಿಯಲ್ ರಿಯಲ್ ಎಸ್ಟೇಟ್ ಮತ್ತು ಕಾರ್ಪೊರೇಟ್ ಬಾಂಡ್‌ಗಳಲ್ಲಿ 9% ರಿಂದ 14% ಆದಾಯ ಗಳಿಸಿ.',
    },
    script_transcript: {
      en: 'Earlier, only ultra-wealthy investors could buy a ₹50 Crore commercial building or high-yielding corporate debt. Now, through SEBI-regulated fractional ownership, you can own a ₹5,000 share of an Amazon-leased tech park and earn 8.6% monthly rent deposited directly into your bank!',
      hi: 'पहले केवल अरबपति ही 50 करोड़ का कमर्शियल मॉल या वेयरहाउस खरीद सकते थे। लेकिन अब सेबी द्वारा मान्यता प्राप्त फ्रैक्शनल ओनरशिप के जरिए आप मात्र ₹5,000 में किसी बड़े टेक पार्क में हिस्सेदार बन सकते हैं और हर महीने 8.6% तक का बैंक किराया पा सकते हैं!',
      ta: 'முன்பு பெரும் பணக்காரர்கள் மட்டுமே ₹50 கோடி மதிப்புள்ள வணிக வளாகங்களை வாங்க முடிந்தது. இப்போது செபி விதிகளின்படி வெறும் ₹5,000-ல் நீங்கள் அமேசான் போன்ற நிறுவனங்கள் குத்தகைக்கு எடுத்துள்ள ஐடி பார்க்கில் பங்குதாரராகி மாத வாடகை பெறலாம்!',
      te: 'గతంలో పెద్ద ధనవంతులు మాత్రమే కొనుగోలు చేయగలిగిన వాణిజ్య ఆస్తులను, ఇప్పుడు కేవలం రూ. 5,000 తోనే ఫ్రాక్షనల్ పద్ధతిలో సొంతం చేసుకుని ప్రతి నెలా అద్దె ఆదాయం పొందవచ్చు.',
      mr: 'आता सेबीच्या नियमांनुसार सामान्य गुंतवणूकदारही अवघ्या ₹५,००० मध्ये मोठ्या कमर्शियल आयटी पार्कचे मालक होऊन दरमहा भाडे मिळवू शकतात.',
      bn: 'আগে কেবল ধনী ব্যক্তিরাই বাণিজ্যিক ভবনে বিনিয়োগ করতে পারতেন। এখন সেবি নিয়মের আওতায় মাত্র ৫,০০০ টাকায় আপনিও নিয়মিত ভাড়া পেতে পারেন।',
      kn: 'ಈಗ ಸೆಬಿ ನಿಯಮಾವಳಿಗಳ ಅಡಿಯಲ್ಲಿ ಕೇವಲ ₹5,000 ದೊಂದಿಗೆ ದೊಡ್ಡ ಐಟಿ ಪಾರ್ಕ್‌ನ ಭಾಗವಾಗಿ ಪ್ರತಿ ತಿಂಗಳು ಬಾಡಿಗೆ ಆದಾಯ ಪಡೆಯಬಹುದು.',
    },
    audio_narrative_text: {
      en: 'Fractional ownership democratizes alternative assets. Investors gain legal SPV ownership with monthly rent distributions and capital appreciation, backed by registered title deeds.',
      hi: 'फ्रैक्शनल ओनरशिप बड़े कमर्शियल एसेट्स को हर आम नागरिक की पहुंच में लाता है, जिसमें कानूनी डीड और नियमित मासिक किराया मिलता है।',
      ta: 'பின்ன உரிமை முறை முதலீடுகளை அனைவருக்கும் சாத்தியமாக்குகிறது. சட்டபூர்வ உரிமை மற்றும் மாதாந்திர வாடகை வருவாய் இதில் உறுதி செய்யப்படுகிறது.',
      te: 'ఫ్రాక్షనల్ ఓనర్‌షిప్ ద్వారా సాధారణ ప్రజలు కూడా సురక్షితమైన వాణిజ్య భవనాల్లో పెట్టుబడి పెట్టి ప్రతి నెలా స్థిరమైన అద్దె పొందవచ్చు.',
      mr: 'फ्रॅक्शनल मालकीमुळे सामान्य माणसालाही मोठ्या रिअल इस्टेटमधून नियमित भाडे आणि भांडवली नफा मिळवता येतो.',
      bn: 'ভগ্নাংশ মালিকানা সাধারণ মানুষকেও বড় বাণিজ্যিক সম্পত্তিতে বিনিয়োগ করার ও নিয়মিত মাসিক ভাড়া পাওয়ার সুযোগ দেয়।',
      kn: 'ಫ್ರ್ಯಾಕ್ಷನಲ್ ಮಾಲೀಕತ್ವವು ಸಾಮಾನ್ಯ ಜನರಿಗೂ ಸಹ ವಾಣಿಜ್ಯ ಆಸ್ತಿಗಳಲ್ಲಿ ಹೂಡಿಕೆ ಮಾಡಿ ತಿಂಗಳ ಬಾಡಿಗೆ ಪಡೆಯಲು ಅನುವು ಮಾಡಿಕೊಡುತ್ತದೆ.',
    },
    key_takeaways: {
      en: [
        'Commercial Real Estate offers 8-9% rental yield + capital appreciation',
        'Invoice discounting provides 11-13% short-term yields (30-90 days)',
        'Senior Secured Corporate Bonds pay fixed quarterly/monthly coupons',
        'Regulated under SEBI SM-REIT / RBI escrow guidelines',
      ],
      hi: [
        'कमर्शियल रियल एस्टेट 8-9% किराया और पूंजी वृद्धि देता है',
        'इनवॉइस डिस्काउंटिंग 30-90 दिनों में 11-13% रिटर्न देती है',
        'सीनियर सिक्योर्ड बॉन्ड नियमित मासिक/तिमाही ब्याज देते हैं',
        'सेबी और आरबीआई के कड़े नियमों के तहत सुरक्षित',
      ],
      ta: [
        'கமர்ஷியல் ரியல் எஸ்டேட் 8-9% வாடகை மற்றும் மூலதன வளர்ச்சியை வழங்குகிறது',
        'இன்வாய்ஸ் தள்ளுபடி 30-90 நாட்களில் 11-13% குறுகிய கால வருமானம் தருகிறது',
        'கார்ப்பரேட் பாண்டுகள் நிலையான மாத/காலாண்டு வட்டியை செலுத்துகின்றன',
        'செபி மற்றும் ரிசர்வ் வங்கி விதிகளுக்கு உட்பட்டது',
      ],
      te: [
        'కమర్షియల్ రియల్ ఎస్టేట్ 8-9% అద్దె రాబడిని ఇస్తుంది',
        'ఇన్‌వాయిస్ డిస్కౌంటింగ్ 11-13% స్వల్పకాలిక రాబడిని అందిస్తుంది',
        'కార్పొరేట్ బాండ్లు స్థిరమైన వడ్డీని చెల్లిస్తాయి',
        'సెబీ మరియు ఆర్బీఐ నిబంధనల ప్రకారం సురక్షితం',
      ],
      mr: [
        'कमर्शियल रिअल इस्टेटमधून ८-९% नियमित भाडे आणि मूल्यवृद्धी',
        'इनव्हॉइस डिस्काउंटिंगमधून ३०-९० दिवसांत ११-१३% परतावा',
        'सिक्योर्ड बॉन्ड्समधून हमखास व्याज मिळते',
        'सेबी व आरबीआयच्या मार्गदर्शक तत्त्वांनुसार सुरक्षित',
      ],
      bn: [
        'বাণিজ্যিক রিয়েল এস্টেট ৮-৯% নিয়মিত ভাড়া এবং দীর্ঘমেয়াদী মূলধন বৃদ্ধি দেয়',
        'ইনভয়েস ডিসকাউন্টিং ৩০-৯০ দিনে ১১-১৩% স্বল্পমেয়াদী রিটার্ন দেয়',
        'কর্পোরেট বন্ড নিয়মিত নির্দিষ্ট হারে সুদ প্রদান করে',
        'সেবি ও আরবিআই-এর সুরক্ষায় সম্পূর্ণ নিয়ন্ত্রিত',
      ],
      kn: [
        'ಕಮರ್ಷಿಯಲ್ ರಿಯಲ್ ಎಸ್ಟೇಟ್ 8-9% ಬಾಡಿಗೆ ಮತ್ತು ಬಂಡವಾಳ ಬೆಳವಣಿಗೆ ನೀಡುತ್ತದೆ',
        'ಇನ್‌ವಾಯ್ಸ್ ಡಿಸ್ಕೌಂಟಿಂಗ್ 30-90 ದಿನಗಳಲ್ಲಿ 11-13% ಆದಾಯ ನೀಡುತ್ತದೆ',
        'ಕಾರ್ಪೊರೇಟ್ ಬಾಂಡ್‌ಗಳು ನಿಗದಿತ ಬಡ್ಡಿಯನ್ನು ಪಾವತಿಸುತ್ತವೆ',
        'ಸೆಬಿ ಮತ್ತು ಆರ್‌ಬಿಐ ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ಸುರಕ್ಷಿತ',
      ],
    },
    quiz: {
      question: {
        en: 'What is the key advantage of Invoice Discounting for a retail investor?',
        hi: 'एक खुदरा निवेशक के लिए इनवॉइस डिस्काउंटिंग का सबसे बड़ा लाभ क्या है?',
        ta: 'சில்லறை முதலீட்டாளருக்கு இன்வாய்ஸ் தள்ளுபடியின் முக்கிய நன்மை என்ன?',
        te: 'ఇన్‌వాయిస్ డిస్కౌంటింగ్ యొక్క ముఖ్య ప్రయోజనం ఏమిటి?',
        mr: 'इनव्हॉइस डिस्काउंटिंगचा किरकोळ गुंतवणूकदाराला सर्वात मोठा फायदा कोणता?',
        bn: 'একজন সাধারণ বিনিয়োগকারীর জন্য ইনভয়েস ডিসকাউন্টিংয়ের প্রধান সুবিধা কী?',
        kn: 'ಇನ್‌ವಾಯ್ಸ್ ಡಿಸ್ಕೌಂಟಿಂಗ್‌ನ ಮುಖ್ಯ ಪ್ರಯೋಜನವೇನು?',
      },
      options: {
        en: ['Short 30-90 day tenure with high 11-13% yield', '30-year lock-in period', 'Requires minimum ₹1 Crore', 'Subject to daily stock market crashes'],
        hi: ['30-90 दिनों की छोटी अवधि में 11-13% का उच्च रिटर्न', '30 साल का लॉक-इन', 'कम से कम ₹1 करोड़ की जरूरत', 'रोज शेयर बाजार के उतार-चढ़ाव का खतरा'],
        ta: ['30-90 நாட்கள் குறுகிய காலத்தில் 11-13% அதிக வருமானம்', '30 வருட லாக்-இன்', 'குறைந்தபட்சம் ₹1 கோடி தேவை', 'பங்குச் சந்தை சரிவு ஆபத்து'],
        te: ['30-90 రోజుల స్వల్ప కాలంలో 11-13% అధిక రాబడి', '30 ఏళ్ల లాక్-ఇన్', 'రూ. 1 కోటి కనీస పరిమితి', 'మార్కెట్ హెచ్చుతగ్గుల ప్రభావం'],
        mr: ['३०-९० दिवसांच्या कमी कालावधीत ११-१३% आकर्षक परतावा', '३० वर्षांचा लॉक-इन', 'किमान ₹१ कोटींची आवश्यकता', 'शेअर बाजारातील चढउतारांचा धोका'],
        bn: ['৩০-৯০ দিনের স্বল্প মেয়াদে ১১-১৩% ভালো রিটার্ন', '৩০ বছরের লক-ইন', 'কমপক্ষে ১ কোটি টাকা প্রয়োজন', 'শেয়ার বাজারের পতনের ঝুঁকি'],
        kn: ['30-90 ದಿನಗಳ ಕಡಿಮೆ ಅವಧಿಯಲ್ಲಿ 11-13% ಅಧಿಕ ಆದಾಯ', '30 ವರ್ಷಗಳ ಲಾಕ್-ಇನ್', 'ಕನಿಷ್ಠ ₹1 ಕೋಟಿ ಬೇಕು', 'ಮಾರ್ಕೆಟ್ ಕುಸಿತದ ಅಪಾಯ'],
      },
      correct_option_index: 0,
      explanation: {
        en: 'Invoice discounting lets investors fund short-term receivables of reputed corporate anchors (like Tata Motors or Reliance) for 30 to 90 days, locking in 11-13% pre-tax IRR with zero equity market volatility.',
        hi: 'इनवॉइस डिस्काउंटिंग आपको 30 से 90 दिनों की अल्प अवधि के लिए 11-13% का शानदार रिटर्न देता है, वह भी शेयर बाजार के उतार-चढ़ाव के बिना।',
        ta: 'இன்வாய்ஸ் தள்ளுபடி மூலம் 30 முதல் 90 நாட்களுக்குள் 11-13% வருமானத்தை பங்குச் சந்தை ஏற்ற இறக்கங்கள் இன்றி பெறலாம்.',
        te: 'ఇన్‌వాయిస్ డిస్కౌంటింగ్ ద్వారా 30 నుండి 90 రోజులలో మార్కెట్ రిస్క్ లేకుండా 11-13% రాబడి లభిస్తుంది.',
        mr: 'इनव्हॉइस डिस्काउंटिंगमुळे शेअर बाजाराच्या जोखमीशिवाय ३० ते ९० दिवसांत ११-१३% खात्रीशीर परतावा मिळतो.',
        bn: 'ইনভয়েস ডিসকাউন্টিংয়ের মাধ্যমে শেয়ার বাজারের অস্থিরতা ছাড়াই মাত্র ৩০-৯০ দিনে ১১-১৩% রিটার্ন পাওয়া যায়।',
        kn: 'ಇನ್‌ವಾಯ್ಸ್ ಡಿಸ್ಕೌಂಟಿಂಗ್ 30-90 ದಿನಗಳಲ್ಲಿ ಯಾವುದೇ ಷೇರು ಮಾರುಕಟ್ಟೆ ಅಪಾಯವಿಲ್ಲದೆ 11-13% ಆದಾಯ ಒದಗಿಸುತ್ತದೆ.',
      },
    },
  },
];

// -----------------------------------------------------------------------------
// Contextual Jargon Dictionary (Everyday Simple Analogy vs CFA / Pro Mode)
// -----------------------------------------------------------------------------
export const JARGON_DICTIONARY: JargonTerm[] = [
  {
    term: 'Alternative Investment Fund',
    short_acronym: 'AIF',
    category: 'INVESTMENT',
    simple_everyday_analogy: 'Imagine an exclusive VIP business club where members pool money to buy whole startups, private toll roads, or commercial skyscrapers that normal retail investors cannot touch on stock exchanges.',
    technical_definition: 'A privately pooled investment vehicle established in India under SEBI (AIF) Regulations, 2012. Categorized into Cat-I (Venture Capital/Social Ventures), Cat-II (Private Equity & Real Estate Funds), and Cat-III (Hedge Funds & complex trading strategies).',
    indian_regulatory_context: 'SEBI mandates a minimum ticket size of ₹1 Crore for individual investors (₹25 Lakh for accredited investors/employees of the fund).',
    who_is_it_for: 'High Net-Worth Individuals (HNIs) and family offices seeking non-correlated alpha beyond traditional equity mutual funds.',
    risk_reward_summary: 'High Return Potential (15-22% target IRR) with high illiquidity (3 to 7 year capital lock-in).',
    tags: ['AIF', 'Private Equity', 'Venture Capital', 'HNIs'],
  },
  {
    term: 'Portfolio Management Services',
    short_acronym: 'PMS',
    category: 'WEALTH',
    simple_everyday_analogy: 'Like hiring a master bespoke tailor to handcraft a custom designer suit exclusively for you, instead of buying a ready-made shirt from a retail departmental store (Mutual Fund).',
    technical_definition: 'A professional investment service where a qualified portfolio manager manages individual client portfolios directly in the client\'s own demat account, customized according to risk-return profiles.',
    indian_regulatory_context: 'SEBI mandates a minimum investment ticket size of ₹50 Lakhs per client. Stocks are held directly in the client\'s name.',
    who_is_it_for: 'Affluent individuals desiring concentrated stock portfolios (15-25 high conviction stocks) and direct demat ownership without mutual fund cash drag.',
    risk_reward_summary: 'Targeted outperformance with higher management/performance fees (typically 1.5-2.5% + 15-20% profit share above hurdle rate).',
    tags: ['PMS', 'Bespoke Wealth', 'Demat', 'SEBI ₹50L'],
  },
  {
    term: 'Market-Linked Debenture',
    short_acronym: 'MLD',
    category: 'DEBT',
    simple_everyday_analogy: 'A fixed deposit on steroids: your principal is protected like a shield, but instead of a boring fixed 6% interest, your bonus payoff depends on how well the Nifty 50 or gold index performs over 2 years.',
    technical_definition: 'A hybrid structured debt security issued by NBFCs/corporates where the final coupon payout is linked to the performance of an underlying market index (e.g., Nifty 50, 10-year G-Sec, or Gold benchmark).',
    indian_regulatory_context: 'Post Finance Act 2023, capital gains on MLDs are taxed at marginal income tax slab rates regardless of holding period (Section 50AA).',
    who_is_it_for: 'Moderately conservative investors who want downside principal protection along with equity-market participation.',
    risk_reward_summary: 'Principal protected by issuer credit rating; returns capped by participation rate covenants.',
    tags: ['MLD', 'Structured Debt', 'Principal Protection', 'Nifty Linked'],
  },
  {
    term: 'Real Estate Investment Trust',
    short_acronym: 'REIT',
    category: 'INVESTMENT',
    simple_everyday_analogy: 'Like buying a single brick in a giant IT park where Google and Microsoft pay monthly rent. You collect quarterly rent dividend cheques without dealing with tenants, plumbing, or property brokers!',
    technical_definition: 'A company or trust that owns, operates, or finances income-generating commercial real estate. In India, SEBI requires REITs to distribute at least 90% of net distributable cash flows to unitholders.',
    indian_regulatory_context: 'Listed on NSE/BSE (e.g. Embassy, Mindspace, Brookfield, Nexus). Accessible with minimum investment of ~₹300 to ₹400 for 1 single unit.',
    who_is_it_for: 'Any retail investor wanting steady quarterly passive rental cash flow with inflation-beating capital appreciation.',
    risk_reward_summary: '6-8% distribution yield + 4-6% long-term asset value appreciation with high stock market liquidity.',
    tags: ['REIT', 'Commercial Real Estate', 'Quarterly Dividend', 'Liquid Property'],
  },
  {
    term: 'Invoice Discounting',
    short_acronym: 'TReDS / Supply Chain',
    category: 'DEBT',
    simple_everyday_analogy: 'A small auto parts supplier delivers ₹10 Lakh worth of car bumpers to Tata Motors today, but Tata Motors will pay the bill after 90 days. You pay the supplier ₹9.7 Lakh right now, and collect the full ₹10 Lakh from Tata Motors on day 90. You pocket the ₹30,000 profit!',
    technical_definition: 'Short-term trade receivables financing where a business sells its unpaid invoices issued to creditworthy enterprise buyers to institutional or retail investors at a discount for immediate working capital.',
    indian_regulatory_context: 'Operated through RBI-regulated TReDS platforms or digital escrow fintechs. Backed by verified purchase orders, GST invoices, and e-way bills.',
    who_is_it_for: 'Investors looking for short 30 to 90 day capital parking with 11% to 13% pre-tax yields completely detached from stock market swings.',
    risk_reward_summary: 'Low-to-moderate credit risk when anchored to blue-chip corporate buyers; zero duration risk.',
    tags: ['Invoice Discounting', 'Working Capital', '11-13% Yield', 'Zero Market Risk'],
  },
  {
    term: 'Senior Secured Corporate Bond',
    short_acronym: 'NCD / Bond',
    category: 'DEBT',
    simple_everyday_analogy: 'You lend ₹10,000 directly to a power or infrastructure company. By law, they mortgage their solar panels or factory to you as collateral, and pay you 10.5% interest into your bank account like clockwork.',
    technical_definition: 'A debt obligation issued by a corporate entity backed by specific collateral (tangible assets/first charge). In the event of liquidation, senior secured bondholders are legally first in line to be paid back.',
    indian_regulatory_context: 'Regulated by SEBI Debt Regulations. Debenture Trustees (like Catalyst, Vistra) hold legal mortgage on company assets (minimum 1.0x to 1.25x security cover).',
    who_is_it_for: 'Investors who want higher yields than bank FDs (10-11% vs 6.5%) with legal asset backing.',
    risk_reward_summary: 'Fixed regular coupon payouts with credit risk mitigated by asset collateralization.',
    tags: ['Corporate Bonds', 'Senior Secured', '10%+ APY', 'Asset Backed'],
  },
  {
    term: 'Tax-Loss Harvesting',
    short_acronym: 'TLH',
    category: 'TAX',
    simple_everyday_analogy: 'Using lemon juice from sour investments to make sweet lemonade: intentionally booking temporary portfolio paper losses before March 31 so the tax department cancels out the 20% tax on your winning stocks.',
    technical_definition: 'The strategic practice of selling securities at a loss to offset realized capital gains liabilities, thereby reducing overall income tax burden while simultaneously reinvesting in correlated assets to maintain asset allocation.',
    indian_regulatory_context: 'Governed by Section 70 and 71 of the Income Tax Act. STCL can offset both STCG and LTCG. Unadjusted losses can be carried forward for 8 consecutive assessment years.',
    who_is_it_for: 'Every equity and mutual fund investor with taxable capital gains who wants to retain more net wealth.',
    risk_reward_summary: 'Guaranteed cash tax savings without altering core portfolio sector exposure.',
    tags: ['Tax Harvesting', 'Capital Gains', 'March 31', 'Save 20%'],
  },
  {
    term: 'Commercial Paper',
    short_acronym: 'CP',
    category: 'DEBT',
    simple_everyday_analogy: 'An I.O.U. issued by huge companies like Larsen & Toubro or Reliance when they need cash for just 3 months. They promise to repay with interest, backed purely by their gold-standard corporate reputation.',
    technical_definition: 'An unsecured, short-term debt instrument issued by corporations to finance short-term liabilities (e.g. payroll, inventory), with maturities ranging from 7 days up to 1 year.',
    indian_regulatory_context: 'Regulated by RBI Directions. Only corporates with minimum CRISIL/ICRA A2 credit rating and tangible net worth >= ₹4 Crore can issue CPs.',
    who_is_it_for: 'Institutional money market funds and ultra-HNIs seeking safe, ultra-short liquidity parking.',
    risk_reward_summary: 'Low risk for AAA/A1+ rated issuers; yield sits between treasury bills and corporate bank loans.',
    tags: ['Commercial Paper', 'Money Market', 'Short Term', 'RBI'],
  },
];

/**
 * Helper to speak text aloud using Web Speech API in the user's regional language
 */
export function speakRegionalText(
  text: string,
  langCode: RegionalLanguageCode,
  onEnd?: () => void
): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return null;
  }

  window.speechSynthesis.cancel(); // Stop any currently playing speech

  const utterance = new SpeechSynthesisUtterance(text);
  const langMap: Record<RegionalLanguageCode, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    mr: 'mr-IN',
    bn: 'bn-IN',
    kn: 'kn-IN',
  };

  utterance.lang = langMap[langCode] || 'en-IN';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopRegionalSpeech(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
