// Template definitions for the 3D scene
const PHYSICS_TEST = [{"position":[0,-0.5611186449722975,0],"rotation":[0,0,0],"scale":[9.475172487582173,0.6155249373422851,9.475172487582173],"color":"777777","hasGravity":false},{"position":[0,0,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"777777","hasGravity":false},{"position":[0,2.472572019683369,0],"rotation":[-0.5884172948570177,0.2210228494883355,0.5884172948570178],"scale":[0.6525083472183528,0.6525083472183528,0.6525083472183528],"color":"777777","hasGravity":false},{"position":[0,3.9631697162337187,0],"rotation":[-0.4693766980066377,0.29156384862405865,0.4693766980066377],"scale":[1,1,1],"color":"ffd500","hasGravity":true},{"position":[0,5.532869935566511,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"ff7300","hasGravity":true}]

// Basketball court template
const BASKETBALL_COURT = [
  {"position":[0,-0.22,0],"rotation":[0,0,0],"scale":[15,0.5,28],"color":"ff8c29","hasGravity":false}, // Court floor (orange/brown wooden court)
  {"position":[0,0.05,0],"rotation":[0,0,0],"scale":[13.5,0.1,26],"color":"e67a14","hasGravity":false}, // Court inner area
  
  // Court lines (white)
  {"position":[0,0.11,13],"rotation":[0,0,0],"scale":[12,0.04,0.1],"color":"ffffff","hasGravity":false}, // Baseline (far)
  
  // Free throw circles and lane (far end)
  {"position":[0,0.11,9.5],"rotation":[0,0,0],"scale":[6,0.04,0.1],"color":"ffffff","hasGravity":false}, // Free throw line (far)
  {"position":[3,0.11,11.25],"rotation":[0,0,0],"scale":[0.1,0.04,3.5],"color":"ffffff","hasGravity":false}, // Lane line right (far)
  {"position":[-3,0.11,11.25],"rotation":[0,0,0],"scale":[0.1,0.04,3.5],"color":"ffffff","hasGravity":false}, // Lane line left (far)
  
  // Three point line (far end)
  {"position":[0,0.04,8],"rotation":[0,0,0],"scale":[7.5,0.2,0.1],"color":"ffffff","hasGravity":false}, // Three point arc (far)

  {"position":[4.915797823511876,0,10.452139158432168],"rotation":[0,0.41548654449723404,0],"scale":[0.15889491276003273,0.21461115664801328,5.571252709500212],"color":"ffffff","hasGravity":false}, // Three point arc (side)
  {"position":[-4.915797823511876,0,10.452139158432168],"rotation":[0,-0.41548654449723404,0],"scale":[0.15889491276003273,0.21461115664801328,5.571252709500212],"color":"ffffff","hasGravity":false},
  
  // Basketball hoop (far end)
  {"position":[0,0.11,13],"rotation":[0,0,0],"scale":[1.8,0.04,0.1],"color":"ffffff","hasGravity":false}, // Backboard outline
  {"position":[0,3.05,12.9],"rotation":[0,0,0],"scale":[1.8,1.2,0.1],"color":"ffffff","hasGravity":false}, // Backboard
  {"position":[0,3.05,12.85],"rotation":[0,0,0],"scale":[1.7,1.1,0.05],"color":"cccccc","hasGravity":false}, // Backboard glass
  {"position":[0,3.15,12.82],"rotation":[0,0.05,0],"scale":[0.45,0.45,0.05],"color":"ff5555","hasGravity":false}, // Hoop target square
  {"position":[0,2.5,12.65],"rotation":[0,0.05,0],"scale":[0.2,0.01,0.5],"color":"ff4444","hasGravity":false}, // Rim base
  
  // Rim made of four tubes (one for each side of the square)
  {"position":[0,2.5,12.0],"rotation":[0,0.05,0],"scale":[0.45,0.09,0.09],"color":"ff4444","hasGravity":false}, // Front tube (facing court)
  {"position":[0,2.5,12.4],"rotation":[0,0.05,0],"scale":[0.45,0.09,0.09],"color":"ff4444","hasGravity":false}, // Back tube (near backboard)
  {"position":[-0.225,2.5,12.2],"rotation":[0,0.05,1.57],"scale":[0.09,0.09,0.45],"color":"ff4444","hasGravity":false}, // Left tube
  {"position":[0.225,2.5,12.2],"rotation":[0,0.05,1.57],"scale":[0.09,0.09,0.45],"color":"ff4444","hasGravity":false}, // Right tube
  
  {"position":[0,3.05,13.15],"rotation":[0,0,0],"scale":[0.1,0.1,0.6],"color":"777777","hasGravity":false}, // Hoop support
  {"position":[0,1.5,13.4],"rotation":[0,0,0],"scale":[0.4,3,0.4],"color":"777777","hasGravity":false}, // Hoop pole
    
  // Center court logo (simplified circular logo)
  {"position":[0,0.115,0],"rotation":[0,0,0],"scale":[2,0.04,2],"color":"3366cc","hasGravity":false}, // Logo background
  
  // Court surroundings
  {"position":[0,-0.5,0],"rotation":[0,0,0],"scale":[25,1,40],"color":"888888","hasGravity":false}, // Ground beneath court
];

// Golf course template
const GOLF_COURSE = [
  {"position":[-5,0.05,0],"rotation":[0,0,0],"scale":[2,0.1,2],"color":"8cb669","hasGravity":false},
  {"position":[5,0.05,3],"rotation":[0,0,0],"scale":[2,0.1,2],"color":"8cb669","hasGravity":false},
  {"position":[0,0.05,-5],"rotation":[0,0,0],"scale":[3,0.1,2],"color":"8cb669","hasGravity":false},
  {"position":[-6,0.05,4],"rotation":[0,0,0],"scale":[2,0.15,2],"color":"e6dea2","hasGravity":false},
  {"position":[7,0.05,-3],"rotation":[0,0,0],"scale":[1.5,0.15,1.5],"color":"e6dea2","hasGravity":false},
  {"position":[0,0.1,6],"rotation":[0,0,0],"scale":[0.15,0.15,0.15],"color":"ffffff","hasGravity":false},
  {"position":[0,0.65,6],"rotation":[0,0,0],"scale":[0.05,1,0.05],"color":"cccccc","hasGravity":false},
  {"position":[-5,0.6,-3],"rotation":[0,0,0],"scale":[0.3,1.2,0.3],"color":"8b4513","hasGravity":false},
  {"position":[-5,1.3,-3],"rotation":[0,0,0],"scale":[1,0.8,1],"color":"228b22","hasGravity":false},
  {"position":[4,0.6,-5],"rotation":[0,0.2,0],"scale":[0.3,1.2,0.3],"color":"8b4513","hasGravity":false},
  {"position":[4,1.3,-5],"rotation":[0,0.2,0],"scale":[1,0.8,1],"color":"228b22","hasGravity":false},
  {"position":[-6,0.6,0],"rotation":[0,-0.1,0],"scale":[0.3,1.2,0.3],"color":"8b4513","hasGravity":false},
  {"position":[-6,1.3,0],"rotation":[0,-0.1,0],"scale":[1,0.8,1],"color":"228b22","hasGravity":false},
  {"position":[0,-0.0528278161897342,0],"rotation":[0,0,0],"scale":[12.951939002311372,0.1796863242892093,12.951939002311372],"color":"76b14e","hasGravity":false},
  {"position":[-0.221099755062729,0.9668793456965825,5.983602541884871],"rotation":[0,0,0],"scale":[0.4117762236981015,0.24992439007682207,0.042984077523688304],"color":"ff4242","hasGravity":false},
  {"position":[0,-0.024687536878783833,7.256673293581209],"rotation":[0,0,0],"scale":[1,0.29409201136281515,1],"color":"2bee41","hasGravity":false},
  {"position":[-0.5183157184944122,-0.10021156117913577,6.587732441479651],"rotation":[0,0,0],"scale":[0.22817252885482892,0.379129327483063,1],"color":"2bee41","hasGravity":false},
  {"position":[0.5370184092917921,-0.18112210149160157,6.511708630111891],"rotation":[0,0,0],"scale":[0.579389050839346,0.3861672106189385,0.9751270450660547],"color":"2bee41","hasGravity":false},
  {"position":[-0.2430686079839805,-0.035305414856499184,6.550938853039648],"rotation":[0,0,0],"scale":[0.3139800580414371,0.10478159332512203,0.7800946537216243],"color":"2bee41","hasGravity":false},
  {"position":[1.5555304159959176,-0.1173141446213744,7.54243087865502],"rotation":[0,0,0],"scale":[2.3009853449974536,0.15980467887042255,2.3009853449974536],"color":"51c328","hasGravity":false},
  {"position":[-1.4256484371654916,-0.10866206242313592,7.419211925071474],"rotation":[0,0,0],"scale":[2.201842386332884,0.14221419333613763,2.201842386332884],"color":"51c328","hasGravity":false},
  {"position":[0,-0.05962425849075692,8.770276096525247],"rotation":[0,0,-0.035211337863496],"scale":[2.3229339639918596,0.16898661421554992,2.3229339639918596],"color":"51c328","hasGravity":false},
  {"position":[5.736896023765912,0.02868084760434514,-5.709290565391367],"rotation":[0,0,0],"scale":[1,0.13025985498510215,1],"color":"ffffff","hasGravity":false},
  {"position":[0,-0.6516438861568727,6.828017179885502],"rotation":[0,0,0],"scale":[1,1,1],"color":"777777","hasGravity":false}
]
// House template
const CONST_HOUSE = [
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[2,2,2],"color":"ffffff"}, // Main house structure
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[5.912293923443534,0.145726403683075,5.912293923443534],"color":"00ff00"}, // Green lawn/ground
  {"position":[0,0.8961489054206201,0],"rotation":[0,0,-0.738686876404],"scale":[1.4903938669662014,1.2279975985060276,1.4903938669662014],"color":"ff9900"}, // Orange roof
  {"position":[0,0,0.7606092665102162],"rotation":[0,0,0],"scale":[0.6488370605796285,1.3001379183262618,0.6488370605796285],"color":"333333"} // Front door
];

// Garden parkour template
const GARDEN_PARKOUR = [
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[2,2,2],"color":"ffffff"}, // Base structure
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[5.912293923443534,0.145726403683075,5.912293923443534],"color":"00ff00"}, // Green base platform
  {"position":[0,0.8961489054206201,0],"rotation":[0,0,-0.738686876404],"scale":[1.4903938669662014,1.2279975985060276,1.4903938669662014],"color":"ff9900"}, // Orange roof/platform
  {"position":[0,0,0.7606092665102162],"rotation":[0,0,0],"scale":[0.6488370605796285,1.3001379183262618,0.6488370605796285],"color":"333333"}, // Door/opening
  {"position":[0,-0.7356989341079678,2.4017767992152743],"rotation":[0,0,0],"scale":[10.703530107589339,1.509683239543188,8.084563274153474],"color":"199a44"}, // Large green terrain platform
  {"position":[0,-0.9311828651699345,8.660382139830945],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"}, // Green platform element
  {"position":[-2.839680508664305,-2.147064302365713,10.907028190676948],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"}, // Green platform element
  {"position":[-6.553917521398665,-2.909515688359245,10.755747939395269],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"}, // Green platform element
  {"position":[-8.821817165585376,-3.9185418522769293,8.303923837322905],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"}, // Green platform element
  {"position":[-7.857036579331503,-4.704602219767867,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"199a44"}, // Green platform element
  {"position":[0,0.7401775158267299,5.878612584596645],"rotation":[0.14620855273283584,0.06691540315452627,0.015981981844789984],"scale":[0.3817835073872652,1.9938676057696134,0.3817835073872652],"color":"a26825"}, // Tree trunk
  {"position":[0,1.6969866469557457,6.031281377643768],"rotation":[0,0,0],"scale":[1.1541476468586622,1.1541476468586622,1.588230490681298],"color":"70a225"}, // Tree foliage
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"0000ff"}, // Blue marker
  {"position":[-9.974146483358634,-3.7606440572785997,4.089751196527242],"rotation":[0,0,0],"scale":[1,1,1],"color":"0000ff"}, // Blue marker
  {"position":[-9.247837183429137,-4.269706439861943,5.251169513072078],"rotation":[0,0,0],"scale":[1,1,1],"color":"0000ff"}, // Blue marker
  {"position":[-6.748728697492558,-5.950463790528658,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"72ac2a"}, // Green platform element
  {"position":[-3.7721442388426816,-4.884143240012141,-4.483297396217591],"rotation":[-2.4525771739319406,0.9715599535573657,2.6297609895997587],"scale":[2.9747315271840256,2.9747315271840256,14.149132124662621],"color":"72ac2a"}, // Parkour ramp
  {"position":[-7.383490830656415,-6.1767416902987256,1.996539109297205],"rotation":[0,0,0],"scale":[0.7887055245800305,0.5230260368408406,0.7887055245800305],"color":"ff006f"}, // Pink jump pad
  {"position":[-1.9122150713904271,-0.20835759177290125,-5.863918624093314],"rotation":[0,0,0],"scale":[1,5.3322192661873125,1],"color":"a5651d"}, // Tall tree trunk
  {"position":[-5.557772000321055,-1.9548201702244743,-3.1190937245612798],"rotation":[0,0,0],"scale":[1.6046255543234111,5.654619246273854,1.6046255543234111],"color":"a5651d"}, // Tall tree trunk
  {"position":[-5.786092008179452,2.5475953603947383,-3.1289606442511934],"rotation":[-0.0969720765487077,0.029436045916196096,-0.08152744758727472],"scale":[2.7597546897345304,4.568076429885781,2.7597546897345304],"color":"1e7b46"}, // Tree foliage
  {"position":[-1.7541682894281148,2.4041666721347843,-5.8306859851015815],"rotation":[-0.0036311157368923903,0.5237977552553248,-0.33254551283626554],"scale":[2.730187975450844,3.7432318373818925,2.730187975450844],"color":"1e7b46"}, // Tree foliage
  {"position":[0,-1.02012500526454,-3.9312412755540858],"rotation":[-0.34117551994524165,0,0],"scale":[1,1,1],"color":"a6ff00"}
]; // Lime green platform

// Mountain view template
const MOUNTAIN_VIEW = [
  {"position":[-5.25,3,-9],"rotation":[0,0,0],"scale":[4.5,6,4.5],"color":"888888"}, // Mountain/rock formation
  {"position":[-5.25,3,-9],"rotation":[0,0,0],"scale":[4.5,6,4.5],"color":"888888"}, // Mountain/rock formation
  {"position":[5.25,4.5,-10.5],"rotation":[0,0,0],"scale":[3.75,9,3.75],"color":"999999"}, // Tall mountain peak
  {"position":[0,5.25,-13.5],"rotation":[0,0,0],"scale":[6.75,10.5,6.75],"color":"777777"}, // Large central mountain
  {"position":[-7.5,4,-11],"rotation":[0.1,0.2,0],"scale":[2,8,2],"color":"7a7a7a"}, // Rock formation
  {"position":[-3,6,-14],"rotation":[0.15,-0.1,0.05],"scale":[2.5,7,1.8],"color":"838383"}, // Mountain element
  {"position":[3,7,-15],"rotation":[-0.1,0.15,0.1],"scale":[1.8,9,1.5],"color":"767676"}, // Mountain element
  {"position":[7,3,-12],"rotation":[0.05,0.1,-0.05],"scale":[2.2,6,1.7],"color":"828282"}, // Mountain element
  {"position":[-2,8,-11.5],"rotation":[0.2,0,-0.1],"scale":[1.5,4,1.3],"color":"6a6a6a"}, // Rock formation
  {"position":[4,5.5,-9.5],"rotation":[-0.1,-0.15,0],"scale":[1.7,5,1.4],"color":"858585"}, // Rock formation
  {"position":[2.25,0.75,-1.5],"rotation":[0,0,0],"scale":[1.5,0.375,1.5],"color":"b9a184"}, // Stepping stone
  {"position":[4.5,1.5,-3],"rotation":[0,0.2,0],"scale":[1.125,0.3,1.125],"color":"b9a184"}, // Stepping stone
  {"position":[3,2.25,-5.25],"rotation":[0,0,0.1],"scale":[0.9,0.3,0.9],"color":"b9a184"}, // Stepping stone
  {"position":[0,3,-6.75],"rotation":[0,0,0],"scale":[1.125,0.3,1.125],"color":"b9a184"}, // Stepping stone
  {"position":[-3,3.75,-6],"rotation":[0,0,-0.1],"scale":[0.9,0.225,0.9],"color":"b9a184"}, // Stepping stone
  {"position":[-4.5,5.25,-4.5],"rotation":[0,0,0],"scale":[0.75,0.225,0.75],"color":"b9a184"}, // Stepping stone
  {"position":[-2.25,6,-3],"rotation":[0,0,0],"scale":[0.9,0.225,0.9],"color":"b9a184"}, // Stepping stone
  {"position":[0.75,7.5,-3.75],"rotation":[0,0,0],"scale":[0.75,0.225,0.75],"color":"b9a184"}, // Stepping stone
  {"position":[3.75,1.875,-4.125],"rotation":[0,0,0],"scale":[0.15,0.75,0.15],"color":"643200"}, // Tree trunk
  {"position":[3.75,2.625,-4.125],"rotation":[0,0,0],"scale":[0.75,0.75,0.75],"color":"2d6a4f"}, // Tree foliage
  {"position":[-3,4.5,-5.25],"rotation":[0.2,0,0],"scale":[0.15,1.125,0.15],"color":"643200"}, // Tree trunk
  {"position":[-3.75,4.2,-6],"rotation":[0,0,0],"scale":[0.3,0.3,0.3],"color":"ffcc00"}, // Yellow flower/decoration
  {"position":[-1.5,6.45,-3],"rotation":[0,0,0],"scale":[0.375,0.375,0.375],"color":"ffcc00"}, // Yellow flower/decoration
  {"position":[-0.375,4.875,-3.75],"rotation":[0,0.5,0.1],"scale":[2.25,0.15,0.375],"color":"8d6e63"}, // Wooden bridge
  {"position":[-3.375,5.55,-3.75],"rotation":[0,0.2,0.05],"scale":[1.5,0.15,0.3],"color":"8d6e63"}, // Wooden bridge
  {"position":[2.25,3,-8.25],"rotation":[0.3,0.2,0.1],"scale":[1.125,0.75,1.125],"color":"57534e"}, // Rock
  {"position":[-1.5,4.5,-9],"rotation":[-0.1,-0.2,0.1],"scale":[0.9,0.6,0.9],"color":"57534e"}, // Rock
  {"position":[0.75,6.75,-6.75],"rotation":[0.2,0.3,0.1],"scale":[0.6,0.45,0.6],"color":"57534e"}, // Rock
  {"position":[0,9,-6],"rotation":[0,0,0],"scale":[1.5,0.375,1.5],"color":"90caf9"}, // Cloud
  {"position":[0,9.6,-6],"rotation":[0,0,0],"scale":[0.375,0.75,0.375],"color":"ffcc00"}, // Sun
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[1.6064627981569832,1.6064627981569832,1.6064627981569832],"color":"d6d6ff"}, // Sky sphere
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[7.293430777555192,1,7.40871325740744],"color":"ffffff"}, // Ground base
  {"position":[3.007786805650126,0.6451367499975595,-3.4659097483133943],"rotation":[0,0,0],"scale":[1,2.634357385891563,1],"color":"9e7f29"}, // Tree trunk
  {"position":[2.5994180927491657,2.173198563820751,-7.021735367846275],"rotation":[0,0,0],"scale":[1,1,1],"color":"9090a2"}, // Rock
  {"position":[-2.340315884527245,2.9125966618396752,-6.215930454897527],"rotation":[0,0,0],"scale":[0.6451487024106918,0.6451487024106918,0.6451487024106918],"color":"aa9e55"}, // Decorative element
  {"position":[-5.294931950277659,4.650406474236801,-4.8978913282845955],"rotation":[0,0,0],"scale":[1,0.22125167502101625,1],"color":"f9d77b"}, // Yellow flower/decoration
  {"position":[-0.3344402389136385,7.498801597040584,-5.390612100345711],"rotation":[0.23747679157238372,0,0],"scale":[0.5415100664804049,0.2805372707317362,5.387673038565984],"color":"c26814"}, // Wooden beam
  {"position":[-0.40743516212775877,2.734910764527899,3.309078465049014],"rotation":[0,0,0],"scale":[2.583707499974447,1.695605268815565,0.16139559489483885],"color":"ffdac2"}, // Platform/bench
  {"position":[-1.4125585526710362,1.1529809942649227,3.300083198685026],"rotation":[0,0,0],"scale":[0.09627738874589405,1.9869103516505875,0.09627738874589405],"color":"ffdac2"}, // Table/bench leg
  {"position":[0.7426729464018558,1.172562569336541,3.315556519260766],"rotation":[0,0,0],"scale":[0.06194815863728011,1.8635702318031748,0.06194815863728011],"color":"ffdac2"}, // Table/bench leg
  {"position":[1.604823582268245,8.701745969660916,-7.472449913973698],"rotation":[0,0,0],"scale":[0.500992122567206,0.17724036352128494,0.500992122567206],"color":"a3f3f5"}, // Water/lake element
  {"position":[1.4064457443615048,8.298802342536375,-7.208933238224936],"rotation":[0,0,0],"scale":[0.47160188515869966,0.47160188515869966,0.47160188515869966],"color":"a1c4b8"}, // Water/lake element
  {"position":[3.471217115092584,5.841759900743868,-10.020600138380939],"rotation":[0.005912201652498055,-0.09063193519210996,-0.06477456787091264],"scale":[1.487075520021273,10.020326464265825,1.487075520021273],"color":"858593"}, // Distant mountain
  {"position":[-2.6664597900009746,1.685735711704476,-9.870013913634569],"rotation":[0,0,0],"scale":[1.1271377070446211,5.016814168705493,1.1271377070446211],"color":"858593"}, // Mountain element
  {"position":[-2.8660796556340182,1.41758965070298,-8.726470145787204],"rotation":[0.4020646434799646,0.03241309769871829,0.05775280501309669],"scale":[1.0610646209389731,3.9862973195137816,1.0610646209389731],"color":"858593"}
]; // Mountain element

// City block template
const CITY_BLOCK = [{"position":[0,0,0],"rotation":[0,0,0],"scale":[20,0.1,20],"color":"aaaaaa","hasGravity":false},{"position":[-5,2,-5],"rotation":[0,0,0],"scale":[3,4,3],"color":"6688aa","hasGravity":false},{"position":[5,3,-5],"rotation":[0,0,0],"scale":[3,6,3],"color":"bb9988","hasGravity":false},{"position":[5,1.5,5],"rotation":[0,0,0],"scale":[3,3,3],"color":"99aa88","hasGravity":false},{"position":[-6.361359701276022,6.021861735353015,2.840797083960137],"rotation":[0,0,0],"scale":[2.4604933930016166,12.132248965179018,2.4604933930016166],"color":"ffffff","hasGravity":false},{"position":[-2.911074508714476,3.538407129639231,8.1889889750765],"rotation":[0,0,0],"scale":[2.128927458420069,7.093500419266534,2.128927458420069],"color":"ffffff","hasGravity":false},{"position":[0,0.06,0],"rotation":[0,0,0],"scale":[0.5,0.01,18],"color":"ffffff","hasGravity":false},{"position":[0,0.06,0],"rotation":[0,0,0],"scale":[18,0.01,0.5],"color":"ffffff","hasGravity":false},{"position":[3,0.3,2],"rotation":[0,0.3,0],"scale":[0.8,0.3,1.4],"color":"cc3333","hasGravity":false},{"position":[3.2,0.15,1.6],"rotation":[0,0.3,0],"scale":[0.2,0.2,0.2],"color":"222222","hasGravity":false},{"position":[2.8,0.15,2.4],"rotation":[0,0.3,0],"scale":[0.2,0.2,0.2],"color":"222222","hasGravity":false},{"position":[-3,0.75,2],"rotation":[0,0,0],"scale":[0.4,1.5,0.4],"color":"8b4513","hasGravity":false},{"position":[-3,1.8,2],"rotation":[0,0.2,0],"scale":[1.2,1.2,1.2],"color":"228833","hasGravity":false},{"position":[4,0.5,-3],"rotation":[0,0,0],"scale":[0.3,1,0.3],"color":"8b4513","hasGravity":false},{"position":[4,1.25,-3],"rotation":[0,0.3,0],"scale":[0.8,0.8,0.8],"color":"33aa44","hasGravity":false},{"position":[-8,1,-8],"rotation":[0,0,0],"scale":[0.2,2,0.2],"color":"333333","hasGravity":false},{"position":[-8,2,-8],"rotation":[0,0,0],"scale":[0.4,0.2,0.4],"color":"ffff99","hasGravity":false},{"position":[8,1,8],"rotation":[0,0,0],"scale":[0.2,2,0.2],"color":"333333","hasGravity":false},{"position":[8,2,8],"rotation":[0,0,0],"scale":[0.4,0.2,0.4],"color":"ffff99","hasGravity":false},{"position":[-2.3931774499231757,0,3.7962060318198336],"rotation":[0,0,0],"scale":[1,1,1],"color":"aeaed0","hasGravity":false},{"position":[2.0703085119890035,6.600628599931982,1.9757186886635445],"rotation":[0,0,0],"scale":[1,0.6670564416090144,4.5692587330367065],"color":"9d9daa","hasGravity":false},{"position":[1.8367803942926528,6.3894102564725,-3.4389758843552185],"rotation":[0,0,-0.4838127857293179],"scale":[0.7058776349920409,0.14544930515772972,5.241211803927037],"color":"d5a46c","hasGravity":false},{"position":[3.2777481071386427,6.116330096025057,-5.974242850712737],"rotation":[0.23991270909642906,-0.009945372372252981,-0.10210847708252374],"scale":[7.813503517104752,0.26486776599161266,2.0208508464501262],"color":"d5a46c","hasGravity":false},{"position":[2.1297765288638297,7.013772641041847,-6.8589577884784605],"rotation":[0,0,0],"scale":[1,1.7874551255079683,0.35396833341135053],"color":"938b58","hasGravity":false},{"position":[0,-0.4690937239869515,0],"rotation":[0,0,0],"scale":[21.871625972152124,0.9224561347760419,21.871625972152124],"color":"9f9fa8","hasGravity":false},{"position":[0.8262971261872782,3.1405213844717395,-6.102246048531755],"rotation":[0,0,0],"scale":[0.7737929279361688,7.526264279099656,0.7737929279361688],"color":"787882","hasGravity":false},{"position":[3.011340938327524,0.49914478993327593,1.9857393478740408],"rotation":[0,0.31992407438569764,0],"scale":[0.43943269610783087,0.43943269610783087,0.622553415071414],"color":"1d63cb","hasGravity":false},{"position":[3.4247066197963276,0.12364372336848312,2.226548939837657],"rotation":[0,0,0],"scale":[0.2727702145318884,0.2727702145318884,0.2727702145318884],"color":"091e3e","hasGravity":false},{"position":[2.5814021468482444,0.16025525893800885,1.6781585024127872],"rotation":[0,0,0],"scale":[0.33042001066224874,0.33042001066224874,0.33042001066224874],"color":"091e3e","hasGravity":false},{"position":[1.6362902088557867,3.4210815118805655,2.8470349123632097],"rotation":[0,0,0],"scale":[0.2828862374484095,8.912269281591064,0.2828862374484095],"color":"727374","hasGravity":false},{"position":[-5.5096125729353815,11.250471525440698,2.5602608739565405],"rotation":[0,0,0],"scale":[1,1,1],"color":"727374","hasGravity":false},{"position":[-3.267370986503269,0.8600594955309262,8.874112904244496],"rotation":[0,0,0],"scale":[0.44470258327103046,2.7271032359289675,1],"color":"727374","hasGravity":false},{"position":[6.141555112665763,3.4924190616136648,-5.470620854588005],"rotation":[0,0,0],"scale":[1,1,1],"color":"b0dbdb","hasGravity":false},{"position":[4.360559122477756,4.991467008720441,-3.9583761517676095],"rotation":[0,0,0],"scale":[1,1,1],"color":"b0dbdb","hasGravity":false},{"position":[-6.74333185377731,10.472459175219548,1.9950503302619218],"rotation":[0,0,0],"scale":[1,1,1],"color":"b0dbdb","hasGravity":false},{"position":[-4.9045288376269855,3.4703442151822523,-4.888970524410495],"rotation":[0,0,0],"scale":[3.984760458580727,0.9221771817457534,3.984760458580727],"color":"4b6d6c","hasGravity":false}]

// Medieval castle template
const CASTLE = [{"position":[0,-0.1,0],"rotation":[0,0,0],"scale":[15,0.2,15],"color":"7d8471","hasGravity":false},{"position":[0,2,0],"rotation":[0,0,0],"scale":[10,4,10],"color":"a9a9a9","hasGravity":false},{"position":[0,4.25,0],"rotation":[0,0,0],"scale":[10.5,0.5,10.5],"color":"808080","hasGravity":false},{"position":[-5,3,-5],"rotation":[0,0,0],"scale":[2,6,2],"color":"a9a9a9","hasGravity":false},{"position":[5,3,-5],"rotation":[0,0,0],"scale":[2,6,2],"color":"a9a9a9","hasGravity":false},{"position":[5,3,5],"rotation":[0,0,0],"scale":[2,6,2],"color":"a9a9a9","hasGravity":false},{"position":[-5,3,5],"rotation":[0,0,0],"scale":[2,6,2],"color":"a9a9a9","hasGravity":false},{"position":[-5,6.25,-5],"rotation":[0,0,0],"scale":[2.4,0.5,2.4],"color":"808080","hasGravity":false},{"position":[5,6.25,-5],"rotation":[0,0,0],"scale":[2.4,0.5,2.4],"color":"808080","hasGravity":false},{"position":[5,6.25,5],"rotation":[0,0,0],"scale":[2.4,0.5,2.4],"color":"808080","hasGravity":false},{"position":[-5,6.25,5],"rotation":[0,0,0],"scale":[2.4,0.5,2.4],"color":"808080","hasGravity":false},{"position":[0,4.5,5.25],"rotation":[0,0,0],"scale":[3.5,1,1.5],"color":"808080","hasGravity":false},{"position":[0,5,0],"rotation":[0,0,0],"scale":[4,6,4],"color":"a9a9a9","hasGravity":false},{"position":[0,8.25,0],"rotation":[0,0,0],"scale":[4.5,0.5,4.5],"color":"808080","hasGravity":false},{"position":[0,9.5,0],"rotation":[0,0,0],"scale":[0.5,2,0.5],"color":"a9a9a9","hasGravity":false},{"position":[0.3,10.5,0],"rotation":[0,0.5,0],"scale":[1.2,0.8,0.1],"color":"b22222","hasGravity":false},{"position":[-4,4.75,-5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-2,4.75,-5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[0,4.75,-5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[2,4.75,-5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[4,4.75,-5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-4,4.75,5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-2,4.75,5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[2,4.75,5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[4,4.75,5],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[5,4.75,-4],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[5,4.75,-2],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[5,4.75,0],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[5,4.75,2],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[5,4.75,4],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-5,4.75,-4],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-5,4.75,-2],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-5,4.75,0],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-5,4.75,2],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-5,4.75,4],"rotation":[0,0,0],"scale":[0.4,0.5,0.4],"color":"696969","hasGravity":false},{"position":[-2,1.5,0],"rotation":[0,0,0],"scale":[2,3,2],"color":"8b7355","hasGravity":false},{"position":[2,1.5,-2],"rotation":[0,0,0],"scale":[2,3,2],"color":"8b7355","hasGravity":false},{"position":[0,0,7],"rotation":[0,0,0],"scale":[12,0.5,4],"color":"4682b4","hasGravity":false},{"position":[0,0.25,6],"rotation":[0,0,0],"scale":[2,0.2,2],"color":"8b7355","hasGravity":false},{"position":[-5,3,-4.5],"rotation":[0,0,0],"scale":[0.5,1,0.1],"color":"4b3621","hasGravity":false},{"position":[5,3,-4.5],"rotation":[0,0,0],"scale":[0.5,1,0.1],"color":"4b3621","hasGravity":false},{"position":[5,3,4.5],"rotation":[0,0,0],"scale":[0.5,1,0.1],"color":"4b3621","hasGravity":false},{"position":[-5,3,4.5],"rotation":[0,0,0],"scale":[0.5,1,0.1],"color":"4b3621","hasGravity":false},{"position":[0,6,-2],"rotation":[0,0,0],"scale":[0.5,1,0.1],"color":"4b3621","hasGravity":false},{"position":[0,6,2],"rotation":[0,0,0],"scale":[0.5,1,0.1],"color":"4b3621","hasGravity":false},{"position":[2,6,0],"rotation":[0,1.57,0],"scale":[0.5,1,0.1],"color":"4b3621","hasGravity":false},{"position":[-2,6,0],"rotation":[0,1.57,0],"scale":[0.5,1,0.1],"color":"4b3621","hasGravity":false},{"position":[0,2.7307913412058222,5.329880009119243],"rotation":[0,0,0],"scale":[1.7637322272730378,3.519902897772534,1],"color":"800040","hasGravity":false},{"position":[0,2.430950600630477,5.021616714648233],"rotation":[0,0,0],"scale":[2.736700301914393,4.372203685891725,1.4340733051935712],"color":"927e56","hasGravity":false},{"position":[0,-0.5022432960305436,0],"rotation":[0,0,0],"scale":[24.660123002546936,-0.796959522213645,24.660123002546936],"color":"809c4b","hasGravity":false},{"position":[-5.843347613845693,0,5.7328955033416475],"rotation":[0,0,0],"scale":[1.258741496016547,1,1.2248349327187338],"color":"858761","hasGravity":false},{"position":[6.00261372321013,0,5.864767887585849],"rotation":[0,0,0],"scale":[1,1,1],"color":"858761","hasGravity":false}]

// Bowling alley template
const BOWLING_ALLEY = [
  {"position":[0,0.15,-2],"rotation":[0,0,0],"scale":[2.25,0.2,13],"color":"d4a76a","hasGravity":false},
  {"position":[0,0.16,-4],"rotation":[0,0,0],"scale":[1.8,0.01,0.1],"color":"000000","hasGravity":false},
  {"position":[0,0.16,-6],"rotation":[0,0,0],"scale":[1.8,0.01,0.1],"color":"000000","hasGravity":false},
  {"position":[0,0.16,-8],"rotation":[0,0,0],"scale":[1.8,0.01,0.1],"color":"000000","hasGravity":false},
  {"position":[1.2,0.05,-2],"rotation":[0,0,0],"scale":[0.3,0.1,15],"color":"222222","hasGravity":false},
  {"position":[-1.2,0.05,-2],"rotation":[0,0,0],"scale":[0.3,0.1,15],"color":"222222","hasGravity":false},
  {"position":[0,0.6,-9.5],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[0.3,0.6,-9.8],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[-0.3,0.6,-9.8],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[0.6,0.6,-10.1],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[0,0.6,-10.1],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[-0.6,0.6,-10.1],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[0.9,0.6,-10.4],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[0.3,0.6,-10.4],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[-0.3,0.6,-10.4],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[-0.9,0.6,-10.4],"rotation":[0,0,0],"scale":[0.1,0.95,0.1],"color":"ffffff","hasGravity":true},
  {"position":[0,-0.4757091232797994,-3.649876459484724],"rotation":[0,0,0],"scale":[6.628786182670685,1,19.485644319265116],"color":"777777","hasGravity":false},
  {"position":[0,-0.47830627143617066,6.408085915382304],"rotation":[0,0,0],"scale":[10.889132533864196,1.2757985957753937,4.977105205470304],"color":"b0b0b0","hasGravity":false},
  {"position":[0,0.583056724797393,-13.62530357437102],"rotation":[-0.554502935930237,0,0],"scale":[21.484232637500515,2.2292547646173113,0.5156925828674114],"color":"b0b0b0","hasGravity":false},
  {"position":[0,-0.4041575013420554,-10.076663198634124],"rotation":[0,0,0],"scale":[3.5763432117431773,0.9247051524065331,3.5763432117431773],"color":"88551b","hasGravity":false},

  {"position":[0,-0.3468488011928468,-2.27100479054715],"rotation":[0,0,0],"scale":[23.646840297588522,0.6492659413722207,23.646840297588522],"color":"6aad34","hasGravity":false},

];

// Football field template
const FOOTBALL_FIELD = [
  // Main field (green turf)
  {"position":[0,-0.22,0],"rotation":[0,0,0],"scale":[30,0.5,50],"color":"4caf50","hasGravity":false}, // Field base
  {"position":[0,0.05,0],"rotation":[0,0,0],"scale":[28,0.1,48],"color":"388e3c","hasGravity":false}, // Field playing area
  
  // Yard lines (white)
  {"position":[0,0.11,0],"rotation":[0,0,0],"scale":[20,0.04,0.3],"color":"ffffff","hasGravity":false}, // 50 yard line (middle)
  {"position":[0,0.11,5],"rotation":[0,0,0],"scale":[20,0.04,0.2],"color":"ffffff","hasGravity":false}, // 40 yard line
  {"position":[0,0.11,10],"rotation":[0,0,0],"scale":[20,0.04,0.2],"color":"ffffff","hasGravity":false}, // 30 yard line
  {"position":[0,0.11,15],"rotation":[0,0,0],"scale":[20,0.04,0.2],"color":"ffffff","hasGravity":false}, // 20 yard line
  {"position":[0,0.11,20],"rotation":[0,0,0],"scale":[20,0.04,0.2],"color":"ffffff","hasGravity":false}, // 10 yard line
  
  {"position":[0,0.11,-5],"rotation":[0,0,0],"scale":[20,0.04,0.2],"color":"ffffff","hasGravity":false}, // 40 yard line (other side)
  {"position":[0,0.11,-10],"rotation":[0,0,0],"scale":[20,0.04,0.2],"color":"ffffff","hasGravity":false}, // 30 yard line (other side)
  {"position":[0,0.11,-15],"rotation":[0,0,0],"scale":[20,0.04,0.2],"color":"ffffff","hasGravity":false}, // 20 yard line (other side)
  {"position":[0,0.11,-20],"rotation":[0,0,0],"scale":[20,0.04,0.2],"color":"ffffff","hasGravity":false}, // 10 yard line (other side)
  
  // Hash marks
  {"position":[4,0.11,0],"rotation":[0,0,0],"scale":[0.2,0.04,0.5],"color":"ffffff","hasGravity":false}, // Hash mark
  {"position":[-4,0.11,0],"rotation":[0,0,0],"scale":[0.2,0.04,0.5],"color":"ffffff","hasGravity":false}, // Hash mark
  
  // Goal lines
  {"position":[0,0.11,24],"rotation":[0,0,0],"scale":[20,0.04,0.3],"color":"ffffff","hasGravity":false}, // Goal line
  {"position":[0,0.11,-24],"rotation":[0,0,0],"scale":[20,0.04,0.3],"color":"ffffff","hasGravity":false}, // Goal line (other end)
  
  // End zones (slightly different color)
  {"position":[0,0.04,27],"rotation":[0,0,0],"scale":[20,0.08,6],"color":"1b5e20","hasGravity":false}, // End zone
  {"position":[0,0.04,-27],"rotation":[0,0,0],"scale":[20,0.08,6],"color":"1b5e20","hasGravity":false}, // End zone (other end)
  
  // Sidelines
  {"position":[10.5,0.11,0],"rotation":[0,0,0],"scale":[0.5,0.04,48],"color":"ffffff","hasGravity":false}, // Sideline right
  {"position":[-10.5,0.11,0],"rotation":[0,0,0],"scale":[0.5,0.04,48],"color":"ffffff","hasGravity":false}, // Sideline left
  
  // Goal posts
  // Left goal post (complex shape built from parts)
  {"position":[0,1.5,30],"rotation":[0,0,0],"scale":[0.3,3,0.3],"color":"ffff00","hasGravity":false}, // Vertical post
  {"position":[0,3,30],"rotation":[0,0,0],"scale":[4.5,0.3,0.3],"color":"ffff00","hasGravity":false}, // Crossbar
  {"position":[2.25,4.5,30],"rotation":[0,0,0],"scale":[0.2,3,0.2],"color":"ffff00","hasGravity":false}, // Right upright
  {"position":[-2.25,4.5,30],"rotation":[0,0,0],"scale":[0.2,3,0.2],"color":"ffff00","hasGravity":false}, // Left upright
  
  // Right goal post (complex shape built from parts)
  {"position":[0,1.5,-30],"rotation":[0,0,0],"scale":[0.3,3,0.3],"color":"ffff00","hasGravity":false}, // Vertical post
  {"position":[0,3,-30],"rotation":[0,0,0],"scale":[4.5,0.3,0.3],"color":"ffff00","hasGravity":false}, // Crossbar
  {"position":[2.25,4.5,-30],"rotation":[0,0,0],"scale":[0.2,3,0.2],"color":"ffff00","hasGravity":false}, // Right upright
  {"position":[-2.25,4.5,-30],"rotation":[0,0,0],"scale":[0.2,3,0.2],"color":"ffff00","hasGravity":false}, // Left upright
  
  // Team benches
  {"position":[14,0.5,0],"rotation":[0,0,0],"scale":[1.5,1,10],"color":"555555","hasGravity":false}, // Right bench
  {"position":[-14,0.5,0],"rotation":[0,0,0],"scale":[1.5,1,10],"color":"555555","hasGravity":false}, // Left bench
  
  // Field surroundings
  {"position":[0,-0.5,0],"rotation":[0,0,0],"scale":[40,1,60],"color":"888888","hasGravity":false}, // Ground beneath field
  
  // Field markings - numbers (simplified)
  {"position":[7,0.11,10],"rotation":[0,0,0],"scale":[1,0.05,1.5],"color":"ffffff","hasGravity":false}, // "30" yard marker
  {"position":[-7,0.11,10],"rotation":[0,0,0],"scale":[1,0.05,1.5],"color":"ffffff","hasGravity":false}, // "30" yard marker
  {"position":[7,0.11,-10],"rotation":[0,0,0],"scale":[1,0.05,1.5],"color":"ffffff","hasGravity":false}, // "30" yard marker
  {"position":[-7,0.11,-10],"rotation":[0,0,0],"scale":[1,0.05,1.5],"color":"ffffff","hasGravity":false}, // "30" yard marker
];

// Soccer field template
const SOCCER_FIELD = [
  // soccer ball
  {"position":[0,2.2,0],"rotation":[0.5,0.5,0.5],"scale":[0.33,0.33,0.33],"color":"ffffff","hasGravity":true}, // Soccer ball

  // Main field (green turf)
  {"position":[0,-0.11,0],"rotation":[0,0,0],"scale":[15,0.5,22.5],"color":"4caf50","hasGravity":false}, // Field base
  {"position":[0,0.05,0],"rotation":[0,0,0],"scale":[14,0.1,21],"color":"388e3c","hasGravity":false}, // Field playing area
  
  // Field boundaries (white lines)
  {"position":[0,0.13,-7],"rotation":[0,0,0],"scale":[6,0.04,0.2],"color":"ffffff","hasGravity":false}, // Halfway line
  {"position":[0,0.13,7],"rotation":[0,0,0],"scale":[6,0.04,0.2],"color":"ffffff","hasGravity":false}, // Halfway line
  {"position":[0,0.13,0],"rotation":[0,0,0],"scale":[12,0.04,0.2],"color":"ffffff","hasGravity":false}, // Halfway line
  {"position":[6,0.13,0],"rotation":[0,0,0],"scale":[0.2,0.04,20],"color":"ffffff","hasGravity":false}, // Right touchline
  {"position":[-6,0.13,0],"rotation":[0,0,0],"scale":[0.2,0.04,20],"color":"ffffff","hasGravity":false}, // Left touchline
  {"position":[0,0.13,10],"rotation":[0,0,0],"scale":[12.1,0.04,0.2],"color":"ffffff","hasGravity":false}, // Top goal line
  {"position":[0,0.13,-10],"rotation":[0,0,0],"scale":[12.1,0.04,0.2],"color":"ffffff","hasGravity":false}, // Bottom goal line
  
  // Center circle
  {"position":[0,0.14,0],"rotation":[0,0,0],"scale":[0.25,0.04,0.25],"color":"ffffff","hasGravity":false}, // Center spot
  
  // Penalty areas (top)
  {"position":[0,0.11,8],"rotation":[0,0,0],"scale":[5.5,0.04,0.2],"color":"ffffff","hasGravity":false}, // Penalty area line (top)
  {"position":[2.75,0.11,9],"rotation":[0,0,0],"scale":[0.2,0.04,2],"color":"ffffff","hasGravity":false}, // Penalty area right (top)
  {"position":[-2.75,0.11,9],"rotation":[0,0,0],"scale":[0.2,0.04,2],"color":"ffffff","hasGravity":false}, // Penalty area left (top)
  
  // Penalty areas (bottom)
  {"position":[0,0.11,-8],"rotation":[0,0,0],"scale":[5.5,0.04,0.2],"color":"ffffff","hasGravity":false}, // Penalty area line (bottom)
  {"position":[2.75,0.11,-9],"rotation":[0,0,0],"scale":[0.2,0.04,2],"color":"ffffff","hasGravity":false}, // Penalty area right (bottom)
  {"position":[-2.75,0.11,-9],"rotation":[0,0,0],"scale":[0.2,0.04,2],"color":"ffffff","hasGravity":false}, // Penalty area left (bottom)
  
  // Goal area (top)
  {"position":[0,0.11,9],"rotation":[0,0,0],"scale":[1.75,0.04,0.2],"color":"ffffff","hasGravity":false}, // Goal area line (top)
  {"position":[0.875,0.11,9.5],"rotation":[0,0,0],"scale":[0.2,0.04,1],"color":"ffffff","hasGravity":false}, // Goal area right (top)
  {"position":[-0.875,0.11,9.5],"rotation":[0,0,0],"scale":[0.2,0.04,1],"color":"ffffff","hasGravity":false}, // Goal area left (top)
  
  // Goal area (bottom)
  {"position":[0,0.11,-9],"rotation":[0,0,0],"scale":[1.75,0.04,0.2],"color":"ffffff","hasGravity":false}, // Goal area line (bottom)
  {"position":[0.875,0.11,-9.5],"rotation":[0,0,0],"scale":[0.2,0.04,1],"color":"ffffff","hasGravity":false}, // Goal area right (bottom)
  {"position":[-0.875,0.11,-9.5],"rotation":[0,0,0],"scale":[0.2,0.04,1],"color":"ffffff","hasGravity":false}, // Goal area left (bottom)
  
  // Penalty spots
  {"position":[0,0.15,6],"rotation":[0,0,0],"scale":[0.33,0.04,0.33],"color":"ffffff","hasGravity":false}, // Penalty spot (top)
  {"position":[0,0.15,-6],"rotation":[0,0,0],"scale":[0.33,0.04,0.33],"color":"ffffff","hasGravity":false}, // Penalty spot (bottom)
  
  // Top goal
  {"position":[0,1,10.3],"rotation":[0,0,0],"scale":[1.85,2,0.1],"color":"ffffff","hasGravity":false}, // Goal back
  {"position":[0.925,1,10.15],"rotation":[0,0,0],"scale":[0.1,2,0.3],"color":"ffffff","hasGravity":false}, // Goal right post
  {"position":[-0.925,1,10.15],"rotation":[0,0,0],"scale":[0.1,2,0.3],"color":"ffffff","hasGravity":false}, // Goal left post
  {"position":[0,2,10.15],"rotation":[0,0,0],"scale":[1.85,0.1,0.3],"color":"ffffff","hasGravity":false}, // Goal top bar
  {"position":[0,0.1,10.15],"rotation":[0,0,0],"scale":[1.85,0.1,0.3],"color":"ffffff","hasGravity":false}, // Goal bottom bar
  
  // Bottom goal
  {"position":[0,1,-10.3],"rotation":[0,0,0],"scale":[1.85,2,0.1],"color":"ffffff","hasGravity":false}, // Goal back
  {"position":[0.925,1,-10.15],"rotation":[0,0,0],"scale":[0.1,2,0.3],"color":"ffffff","hasGravity":false}, // Goal right post
  {"position":[-0.925,1,-10.15],"rotation":[0,0,0],"scale":[0.1,2,0.3],"color":"ffffff","hasGravity":false}, // Goal left post
  {"position":[0,2,-10.15],"rotation":[0,0,0],"scale":[1.85,0.1,0.3],"color":"ffffff","hasGravity":false}, // Goal top bar
  {"position":[0,0.1,-10.15],"rotation":[0,0,0],"scale":[1.85,0.1,0.3],"color":"ffffff","hasGravity":false}, // Goal bottom bar
  
  // Field surroundings
  {"position":[0,-0.5,0],"rotation":[0,0,0],"scale":[20,1,27.5],"color":"888888","hasGravity":false}, // Ground beneath field
  
  // Corner flags
  {"position":[6.1,0.5,10.1],"rotation":[0,0,0],"scale":[0.05,1,0.05],"color":"ff0000","hasGravity":false}, // Top-right flag pole
  {"position":[-6.1,0.5,10.1],"rotation":[0,0,0],"scale":[0.05,1,0.05],"color":"ff0000","hasGravity":false}, // Top-left flag pole
  {"position":[6.1,0.5,-10.1],"rotation":[0,0,0],"scale":[0.05,1,0.05],"color":"ff0000","hasGravity":false}, // Bottom-right flag pole
  {"position":[-6.1,0.5,-10.1],"rotation":[0,0,0],"scale":[0.05,1,0.05],"color":"ff0000","hasGravity":false}, // Bottom-left flag pole
  {"position":[6.15,1,10.05],"rotation":[0,0.7,0],"scale":[0.3,0.2,0.01],"color":"ff0000","hasGravity":false}, // Top-right flag
  {"position":[-6.15,1,10.05],"rotation":[0,-0.7,0],"scale":[0.3,0.2,0.01],"color":"ff0000","hasGravity":false}, // Top-left flag
  {"position":[6.15,1,-10.05],"rotation":[0,0.7,0],"scale":[0.3,0.2,0.01],"color":"ff0000","hasGravity":false}, // Bottom-right flag
  {"position":[-6.15,1,-10.05],"rotation":[0,-0.7,0],"scale":[0.3,0.2,0.01],"color":"ff0000","hasGravity":false}, // Bottom-left flag
  
  // Goal nets (simplified)
  {"position":[0,1,10.5],"rotation":[0,0,0],"scale":[1.85,2,0.4],"color":"eeeeee","hasGravity":false}, // Top goal net
  {"position":[0,1,-10.5],"rotation":[0,0,0],"scale":[1.85,2,0.4],"color":"eeeeee","hasGravity":false}, // Bottom goal net
];

const DOMINOES = [
  {"position":[-5.4,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[-4.5,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[-3.6,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[-2.7,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[-1.8,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[-0.9,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[0,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[0.9,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[1.8,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[2.7,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[3.6,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[4.5,0.5,0],"rotation":[0,0,0],"scale":[0.15,1,0.5],"color":"ffffff","hasGravity":true},
  {"position":[0,-0.3295779100115177,0],"rotation":[0,0,0],"scale":[14.961500813770753,0.5,8.17454926985879],"color":"cea455","hasGravity":false}
]

// const HARDCORE_PARKOUR = [{"position":[0,-0.12562334031557976,0],"rotation":[0,0,0],"scale":[7.109450138185934,0.3786249342102111,7.109450138185934],"color":"88b87a","hasGravity":false},{"position":[2.064422530859277,-0.23653532650957443,2.0065228732648714],"rotation":[0,0,0],"scale":[1,1,1],"color":"b87a7a","hasGravity":false},{"position":[5.629937007813901,-0.8347439834327922,2.0503137657158694],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[6.171866356289745,-0.4522370636060531,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[7.556732693267383,0,-0.6984801389600346],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[7.884657677468553,0.18635554312348268,-3.0842254692205295],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[6.401262830215194,0.24178492455368072,-5.878725438503118],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[3.5992302973765744,0.6670805366354133,-6.76112132122975],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.13071871443107,1.2902138599430966,-7.009440197718795],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-0.06212341785955755,2.6579447584206233,-7.009440197718795],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-1.598664289706026,1.9858928558327729,-7.010318531207623],"rotation":[0,0,0],"scale":[0.7140039082936226,0.7140039082936226,0.7140039082936226],"color":"7ab8a0","hasGravity":false},{"position":[-4.4155086128493055,3.1440840157614205,-7.010318531207623],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-1.4005291353726288,1.5061874909867723,-8.25880873927293],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-2.2222657441388987,2.7035724821423037,-3.5979627361677196],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-3.6619590036524308,1.839542208609625,-3.246319016191122],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-2.8139936344628493,1.9900758305403445,-4.015182705067588],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-0.17178772303765533,3.15513610438702,-6.922299686563689],"rotation":[0,0,0],"scale":[1.4371687255631957,0.7216953130307566,1.4371687255631957],"color":"7ab8a0","hasGravity":false},{"position":[1.089148554869081,3.5293277299978856,-7.113417029413691],"rotation":[0,0,0],"scale":[3.498072627314249,0.5032434374758532,3.498072627314249],"color":"7ab8a0","hasGravity":false},{"position":[-5.18949328940868,2.905842682054667,-6.250226796482806],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-5.998401499385222,2.479967428111171,-5.663528481089309],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-5.584576075503442,2.192210084984063,-5.960679594303004],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-6.109667433726464,5.058737604425639,-7.42178689065892],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-5.827086073319333,4.4123031793131355,-8.101986488963847],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-3.887614739697229,5.466012926686393,-4.872418375411003],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-4.034166699284021,5.679985961929888,-1.3229788142820635],"rotation":[0,0,0],"scale":[1,1,2.2926504175612683],"color":"7ab8a0","hasGravity":false},{"position":[-2.704781327772587,6.273136164771916,2.7002160156371064],"rotation":[0,0.6233162602160603,0],"scale":[1,1,2.603208853557731],"color":"7ab8a0","hasGravity":false},{"position":[0.958849413306682,7.194726655397139,4.954246552367892],"rotation":[0,1.253819572336594,0],"scale":[1,1,2.9268220599753247],"color":"7ab8a0","hasGravity":false},{"position":[-1.1354223341314174,6.999741759855664,6.868540081286929],"rotation":[0,0,0],"scale":[1,1,3.083798206691282],"color":"7ab8a0","hasGravity":false},{"position":[1.5919390306424122,8.15245990183038,8.091418955652586],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[3.9973070197583294,9.096098508203147,7.714152713667423],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[3.183144584679848,9.638195383661033,5.682989606439617],"rotation":[0,0,0],"scale":[1,1.9539408631435597,1],"color":"7ab8a0","hasGravity":false},{"position":[3.4403650804316905,9.433092043921189,4.474944191267175],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[7.851698847064413,7.111358628635109,0.4097167912525993],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[7.840561566313923,6.1000546100131094,2.0358021423418737],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.685883589110282,9.997280504970597,-4.198891244944594],"rotation":[0.5310885160264169,1.3877787807814457e-17,-0.3303338853269424],"scale":[11.836998111293422,1.7388338291583632,3.2702655819846886],"color":"7ab8a0","hasGravity":false},{"position":[9.14009917013559,7.6210224940069455,-1.9772157007727542],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-6.255552661724767,11.240960834396633,-7.508666891481275],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-4.63069645511087,10.204299881333156,-6.853056363617918],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-7.43423821833175,11.825579011402851,-3.9806642202226663],"rotation":[0,0,0],"scale":[1,1,3.1302706461621495],"color":"7ab8a0","hasGravity":false},{"position":[-5.724753168975243,12.44767010180986,1.3398616715436769],"rotation":[-0.43371247940567204,0.7925942941611197,-0.37937029123451366],"scale":[1.6890324837623976,2.007372474508521,4.638506456731524],"color":"7ab8a0","hasGravity":false},{"position":[-0.8707113094517278,14.194783112119165,5.324572347642912],"rotation":[0,0,0],"scale":[4.332395450873885,1.0703716465262754,4.332395450873885],"color":"7ab8a0","hasGravity":false},{"position":[4.341445522331704,15.04145522498609,2.2217205223486634],"rotation":[0.030630104982073122,0.13140941743424744,0.9181959439985521],"scale":[2.2127078197308374,1,1],"color":"7ab8a0","hasGravity":false},{"position":[4.341445522331704,17.03030501343911,0.37504887031351597],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.438057999544566,17.44867160936242,-1.6718688782273015],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-1.3652986648898855,19.71318322670852,-4.372585931213434],"rotation":[0.3005373785473,-1.3877787807814457e-17,-0.3797919216121151],"scale":[4.074143587956221,1.4661666642933722,4.074143587956221],"color":"7ab8a0","hasGravity":false},{"position":[-2.15846918673635,22.58971427783227,-1.4626395580860527],"rotation":[0,0,0],"scale":[3.9372874165320026,0.8047842615581812,3.9372874165320026],"color":"7ab8a0","hasGravity":false},{"position":[4.73786245203064,16.570840176266252,-0.4021493015423523],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[5.34156932023353,15.801411083849526,-0.5474839486461209],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.6848371504013921,17.624869823022152,0],"rotation":[-0.4439661671530678,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.8973717465373596,18.49770516015544,-3.8196276621525875],"rotation":[0.1642462183762609,-0.5993636869046479,0.2810722620959107],"scale":[0.603002624160353,0.2114938020979846,0.603002624160353],"color":"7ab8a0","hasGravity":false},{"position":[-5.362441438420399,21.55154271574556,-5.063843930135016],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-4.636314882128598,21.606679821123127,-4.013206190889829],"rotation":[0,0,0],"scale":[0.4446756940812079,0.4446756940812079,0.4446756940812079],"color":"7ab8a0","hasGravity":false},{"position":[-0.7696302419725338,24.345657055152817,-0.3255789133562761],"rotation":[0,0,0],"scale":[0.18372398489478825,3.477267271227605,0.18372398489478825],"color":"ffffff","hasGravity":false},{"position":[0,1.5,0],"rotation":[0,0,0],"scale":[1,3,1],"color":"8b4513","hasGravity":false},{"position":[0,4,0],"rotation":[0,0,0],"scale":[2.5,3,2.5],"color":"228b22","hasGravity":false},{"position":[0,6.5,0],"rotation":[0,0,0],"scale":[2,2.5,2],"color":"228b22","hasGravity":false},{"position":[0,8.5,0],"rotation":[0,0,0],"scale":[1.5,2,1.5],"color":"228b22","hasGravity":false},{"position":[0,10,0],"rotation":[0,0,0],"scale":[1,1.5,1],"color":"228b22","hasGravity":false},{"position":[-1.5,0.5,0],"rotation":[0,0,0],"scale":[0.5,1,0.5],"color":"8b4513","hasGravity":false},{"position":[1.5,0.5,0],"rotation":[0,0,0],"scale":[0.5,1,0.5],"color":"8b4513","hasGravity":false},{"position":[0,0.5,-1.5],"rotation":[0,0,0],"scale":[0.5,1,0.5],"color":"8b4513","hasGravity":false},{"position":[0,0.5,1.5],"rotation":[0,0,0],"scale":[0.5,1,0.5],"color":"8b4513","hasGravity":false}]
const HARDCORE_PARKOUR = [{"position":[2.064422530859277,-0.23653532650957443,2.0065228732648714],"rotation":[0,0,0],"scale":[1,1,1],"color":"b87a7a","hasGravity":false},{"position":[1.13071871443107,1.2902138599430966,-7.009440197718795],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-0.06212341785955755,2.6579447584206233,-7.009440197718795],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-1.598664289706026,1.9858928558327729,-7.010318531207623],"rotation":[0,0,0],"scale":[0.7140039082936226,0.7140039082936226,0.7140039082936226],"color":"7ab8a0","hasGravity":false},{"position":[-4.4155086128493055,3.1440840157614205,-7.010318531207623],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-1.4005291353726288,1.5061874909867723,-8.25880873927293],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-2.2222657441388987,2.7035724821423037,-3.5979627361677196],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-3.6619590036524308,1.839542208609625,-3.246319016191122],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-2.8139936344628493,1.9900758305403445,-4.015182705067588],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-0.17178772303765533,3.15513610438702,-6.922299686563689],"rotation":[0,0,0],"scale":[1.4371687255631957,0.7216953130307566,1.4371687255631957],"color":"7ab8a0","hasGravity":false},{"position":[1.089148554869081,3.5293277299978856,-7.113417029413691],"rotation":[0,0,0],"scale":[3.498072627314249,0.5032434374758532,3.498072627314249],"color":"7ab8a0","hasGravity":false},{"position":[-5.18949328940868,2.905842682054667,-6.250226796482806],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-5.998401499385222,2.479967428111171,-5.663528481089309],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-5.584576075503442,2.192210084984063,-5.960679594303004],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-6.109667433726464,5.058737604425639,-7.42178689065892],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-5.827086073319333,4.4123031793131355,-8.101986488963847],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-3.887614739697229,5.466012926686393,-4.872418375411003],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-4.034166699284021,5.679985961929888,-1.3229788142820635],"rotation":[0,0,0],"scale":[1,1,2.2926504175612683],"color":"7ab8a0","hasGravity":false},{"position":[-2.704781327772587,6.273136164771916,2.7002160156371064],"rotation":[0,0.6233162602160603,0],"scale":[1,1,2.603208853557731],"color":"7ab8a0","hasGravity":false},{"position":[0.958849413306682,7.194726655397139,4.954246552367892],"rotation":[0,1.253819572336594,0],"scale":[1,1,2.9268220599753247],"color":"7ab8a0","hasGravity":false},{"position":[-1.1354223341314174,6.999741759855664,6.868540081286929],"rotation":[0,0,0],"scale":[1,1,3.083798206691282],"color":"7ab8a0","hasGravity":false},{"position":[1.5919390306424122,8.15245990183038,8.091418955652586],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[3.9973070197583294,9.096098508203147,7.714152713667423],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[3.183144584679848,9.638195383661033,5.682989606439617],"rotation":[0,0,0],"scale":[1,1.9539408631435597,1],"color":"7ab8a0","hasGravity":false},{"position":[3.4403650804316905,9.433092043921189,4.474944191267175],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[7.851698847064413,7.111358628635109,0.4097167912525993],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[7.840561566313923,6.1000546100131094,2.0358021423418737],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.685883589110282,9.997280504970597,-4.198891244944594],"rotation":[0.5310885160264169,1.3877787807814457e-17,-0.3303338853269424],"scale":[11.836998111293422,1.7388338291583632,3.2702655819846886],"color":"7ab8a0","hasGravity":false},{"position":[9.14009917013559,7.6210224940069455,-1.9772157007727542],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-6.255552661724767,11.240960834396633,-7.508666891481275],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-4.63069645511087,10.204299881333156,-6.853056363617918],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-7.43423821833175,11.825579011402851,-3.9806642202226663],"rotation":[0,0,0],"scale":[1,1,3.1302706461621495],"color":"7ab8a0","hasGravity":false},{"position":[-5.724753168975243,12.44767010180986,1.3398616715436769],"rotation":[-0.43371247940567204,0.7925942941611197,-0.37937029123451366],"scale":[1.6890324837623976,2.007372474508521,4.638506456731524],"color":"7ab8a0","hasGravity":false},{"position":[-0.8707113094517278,14.194783112119165,5.324572347642912],"rotation":[0,0,0],"scale":[4.332395450873885,1.0703716465262754,4.332395450873885],"color":"7ab8a0","hasGravity":false},{"position":[4.341445522331704,15.04145522498609,2.2217205223486634],"rotation":[0.030630104982073122,0.13140941743424744,0.9181959439985521],"scale":[2.2127078197308374,1,1],"color":"7ab8a0","hasGravity":false},{"position":[4.341445522331704,17.03030501343911,0.37504887031351597],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.438057999544566,17.44867160936242,-1.6718688782273015],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-1.3652986648898855,19.71318322670852,-4.372585931213434],"rotation":[0.3005373785473,-1.3877787807814457e-17,-0.3797919216121151],"scale":[4.074143587956221,1.4661666642933722,4.074143587956221],"color":"7ab8a0","hasGravity":false},{"position":[-2.15846918673635,22.58971427783227,-1.4626395580860527],"rotation":[0,0,0],"scale":[3.9372874165320026,0.8047842615581812,3.9372874165320026],"color":"7ab8a0","hasGravity":false},{"position":[4.73786245203064,16.570840176266252,-0.4021493015423523],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[5.34156932023353,15.801411083849526,-0.5474839486461209],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.6848371504013921,17.624869823022152,0],"rotation":[-0.4439661671530678,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[1.8973717465373596,18.49770516015544,-3.8196276621525875],"rotation":[0.1642462183762609,-0.5993636869046479,0.2810722620959107],"scale":[0.603002624160353,0.2114938020979846,0.603002624160353],"color":"7ab8a0","hasGravity":false},{"position":[-5.362441438420399,21.55154271574556,-5.063843930135016],"rotation":[0,0,0],"scale":[1,1,1],"color":"7ab8a0","hasGravity":false},{"position":[-4.636314882128598,21.606679821123127,-4.013206190889829],"rotation":[0,0,0],"scale":[0.4446756940812079,0.4446756940812079,0.4446756940812079],"color":"7ab8a0","hasGravity":false},{"position":[-0.7696302419725338,24.345657055152817,-0.3255789133562761],"rotation":[0,0,0],"scale":[0.18372398489478825,3.477267271227605,0.18372398489478825],"color":"ffffff","hasGravity":false},{"position":[-3.9069666109975785,-0.5257348762526909,1.361062164027544],"rotation":[0,0,0],"scale":[1,1,1.7407655718175217],"color":"529dff","hasGravity":false},{"position":[-4.155867309042187,-2.3036989240141224,1.364394113621382],"rotation":[0.11935468046470281,-0.707199179863414,0.08174259580264778],"scale":[1,4.338782822755657,0.5820721406210955],"color":"529dff","hasGravity":false},{"position":[-4.0012911904439585,-1.0892298808067804,1.364394113621382],"rotation":[0,0,-0.6690913676038723],"scale":[1.3645403804438703,1.3645403804438703,1.3645403804438703],"color":"529dff","hasGravity":false},{"position":[-3.603818172125898,-0.40840621553315504,2.5710940318691526],"rotation":[0,-0.38957810274261184,0],"scale":[1,1,1],"color":"6cb24f","hasGravity":false},{"position":[-3.603818172125898,-0.40840621553315504,-0.3202400943457592],"rotation":[0,0,0],"scale":[1,1,2.4492043876186558],"color":"6cb24f","hasGravity":false},{"position":[2.0781487160225627,-0.5371960334725107,2.0273395634694893],"rotation":[0,0.7058779273477481,0],"scale":[2.4781489100662615,1.4398618569200206,2.4781489100662615],"color":"6cb24f","hasGravity":false},{"position":[-1.9141885568907782,0.7859368495900637,3.0777306645203435],"rotation":[0,0,0],"scale":[0.3950245825640011,1.8799685047572758,0.5132290830615729],"color":"cd844f","hasGravity":false},{"position":[-2.7474269655925454,0.8816983431031301,-2.9209451846888888],"rotation":[0,0,0],"scale":[0.2677826798331224,1.8812697181631386,0.2677826798331224],"color":"cd844f","hasGravity":false},{"position":[0.6152988065619311,1.1259523647101077,-2.408912579670204],"rotation":[0,0,0],"scale":[3.273726095410648,2.3890756460493305,1.5983121265377704],"color":"a6a6a6","hasGravity":false},{"position":[2.74756698044518,0.46876188904528626,-2.9500322210578025],"rotation":[0,0,0],"scale":[1,1,1],"color":"a6a6a6","hasGravity":false},{"position":[1.8781861595640237,0.46876188904528626,-1.770640280633132],"rotation":[0,0,0],"scale":[1.763391558309797,1.3048520868254114,1.763391558309797],"color":"a6a6a6","hasGravity":false},{"position":[-1.3317686693852169,0.14949669423567835,-1.770640280633132],"rotation":[0,0,0],"scale":[1.8746291833216022,0.4032021976831829,1.6181090307174808],"color":"a6a6a6","hasGravity":false},{"position":[0.6775468924253821,2.1841756745576815,-2.0251992309732736],"rotation":[0,0,0],"scale":[5.027208063191103,0.190059935194728,2.049909360331608],"color":"bdbdbd","hasGravity":false},{"position":[-0.7911667364333902,1.6968326478519202,-1.8423645992614472],"rotation":[0,0,0],"scale":[1,1,1],"color":"bdbdbd","hasGravity":false},{"position":[0.6532741649790033,1.7450097412582806,-2.8322352047266985],"rotation":[0,-0.1661654863657884,0],"scale":[3.6584330360190562,1,1],"color":"a3a3a3","hasGravity":false},{"position":[-2.76346131875177,2.4802571410498016,-2.9473430105093166],"rotation":[0,0,0],"scale":[1.333761986987975,1.333761986987975,1.333761986987975],"color":"457d34","hasGravity":false},{"position":[-1.957665633489493,1.6577806704987503,3.0671694902141797],"rotation":[0,0,0],"scale":[1.1106520528188115,1.1106520528188115,1.1106520528188115],"color":"457d34","hasGravity":false},{"position":[2.0535887713951406,5.248008299601635,-2.253130281053866],"rotation":[0,0,0],"scale":[1.6541404921217553,3.2836721477467457,1.6541404921217553],"color":"61ae73","hasGravity":false},{"position":[2.1918407262076083,3.9212769155213705,-2.4434326295201547],"rotation":[0,0,0],"scale":[2.3020668678782266,1.1900650051713293,2.3020668678782266],"color":"61ae73","hasGravity":false},{"position":[2.087296102693655,8.437714064732464,-2.3060626048887247],"rotation":[0,0,0],"scale":[0.8170052804716676,4.636599756335799,0.8170052804716676],"color":"61ae73","hasGravity":false},{"position":[2.087296102693655,2.430257259897444,-2.3060626048887247],"rotation":[0,0,0],"scale":[1,4.261679751440747,1],"color":"874c25","hasGravity":false},{"position":[-3.0163233900163045,0.033596205052055406,3.343014947548814],"rotation":[0,0,0],"scale":[1.2154510387956576,0.1419039759910379,0.6311666449152736],"color":"d6c8ac","hasGravity":false},{"position":[-3.8708512305267906,0.033596205052055406,-2.0443105433062456],"rotation":[0,0,0],"scale":[0.9062158355874934,0.24874841210654983,2.1788068541166985],"color":"d6c8ac","hasGravity":false},{"position":[-3.68891616015296,0.033596205052055406,3.0704802198113175],"rotation":[0,0,0],"scale":[1,0.21726130790090303,0.5162766999776254],"color":"d6c8ac","hasGravity":false},{"position":[0.41913585902320083,-0.19312573083157414,-0.5894454923269652],"rotation":[0,0,0],"scale":[7.899623124827804,0.4500650300460385,7.899623124827804],"color":"6cb24f","hasGravity":false},{"type":"mesh","position":[0.41913585902320083,-0.9191907950597762,-0.5894454923269652],"rotation":[0,0,0],"scale":[7.62543209405159,1.1885284597786976,7.62543209405159],"color":"c7c7c7","hasGravity":false},{"type":"mesh","position":[0.41913585902320083,-0.5407203968344167,-0.5894454923269652],"rotation":[0,0,0],"scale":[7.808956165794656,0.5309682919404396,7.808956165794656],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[-0.8702606335547314,-0.5407203968344167,2.79649135070897],"rotation":[0,0,0],"scale":[3.8897307327574606,1,1],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[3.7870800566861167,-0.5407203968344167,1.0315717622532614],"rotation":[0,0,0],"scale":[1,1,4.477698619242311],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[-0.18161499123730973,-0.5407203968344167,-4.017178964401075],"rotation":[0,0,0],"scale":[4.608665786652262,1,1],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[-2.9326808295316313,-0.5879905131225089,-0.5655860078466164],"rotation":[0,0,0],"scale":[1,1,6.044126311951613],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[5.631761303562098,-0.790467951771386,2.011879018148359],"rotation":[0,0,0],"scale":[0.7863400931215458,0.7863400931215458,0.7863400931215458],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[6.238508478216135,-0.3837157077973862,0.029926494732110287],"rotation":[0,0,0],"scale":[0.8184207733755838,0.8184207733755838,0.8184207733755838],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[7.548641731430498,-0.06130123102666396,-0.6944042855521196],"rotation":[0,0,0],"scale":[0.6237152507415488,0.6237152507415488,0.6237152507415488],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[7.885479690247668,0.19075143124110427,-3.138881093330559],"rotation":[0,0,0],"scale":[0.819565814998137,0.819565814998137,0.819565814998137],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[6.438007916258604,0.19075143124110427,-5.878706395614741],"rotation":[0,0,0],"scale":[0.6435548910409988,0.6435548910409988,0.6435548910409988],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[3.5871442588513736,0.6258775615816271,-6.752955202599519],"rotation":[0,0,0],"scale":[0.7025879035126101,0.7025879035126101,0.7025879035126101],"color":"ce9b78","hasGravity":false},{"type":"mesh","position":[3.5871442588513736,0.9186139532827367,-6.752955202599519],"rotation":[0,0,0],"scale":[0.794316012202406,0.1470316518077222,0.794316012202406],"color":"64b450","hasGravity":false},{"type":"mesh","position":[6.436419860781843,0.42748687787380146,-5.884731309249674],"rotation":[0,0,0],"scale":[0.6802123298605648,0.44057464786944556,0.6802123298605648],"color":"64b450","hasGravity":false},{"type":"mesh","position":[7.906785420979022,0.5124306768243887,-3.1464419423690524],"rotation":[0,0,0],"scale":[1,0.2122332126901176,1],"color":"64b450","hasGravity":false},{"type":"mesh","position":[7.567117866715841,0.17556007190098966,-0.7175263057243084],"rotation":[0,0,0],"scale":[0.7088544250339016,0.22807173887386648,0.7088544250339016],"color":"64b450","hasGravity":false},{"type":"mesh","position":[6.2554153671969965,-0.0555999174320993,0.045516363834955165],"rotation":[0,0,0],"scale":[1,0.43105865366245494,1],"color":"64b450","hasGravity":false},{"type":"mesh","position":[5.650111429195344,-0.4361517975661754,2.009520335086782],"rotation":[0,0,0],"scale":[0.8567420560706663,0.1801144881735913,0.8567420560706663],"color":"64b450","hasGravity":false}]

/**
 * Get template data based on the template name
 * @param templateName - The name of the template to retrieve
 * @returns The template data array or null if not found
 */
export function getTemplateData(templateName: string | null): any[] | null {
  if (!templateName) return null;
  
  switch (templateName) {
    case 'golf_course':
      return GOLF_COURSE;
      
    case 'const_house':
      return CONST_HOUSE;
      
    case 'garden_parkour':
      return GARDEN_PARKOUR;
      
    case 'mountain_view':
      return MOUNTAIN_VIEW;
      
    case 'city_block':
      return CITY_BLOCK;
      
    case 'castle':
      return CASTLE;
      
    case 'bowling_alley':
      return BOWLING_ALLEY;
      
    case 'basketball_court':
      return BASKETBALL_COURT;
      
    case 'football_field':
      return FOOTBALL_FIELD;
      
    case 'soccer_field':
      return SOCCER_FIELD;
      
    case 'dominoes':
      return DOMINOES;
      
    case 'hardcore_parkour':
      return HARDCORE_PARKOUR;
      
    default:
      return null;
  }
} 


export const DEFAULT_TEMPLATE_LIST = [
  // { name: 'physics_test', description: 'Physics test' },
  { name: 'const_house', description: '🏠#Simple house' },
  { name: 'garden_parkour', description: '🌳#Parkour garden' },
  { name: 'mountain_view', description: '⛰️#Mountain view' },
  
  { name: 'basketball_court', description: '🏀#Basketball court' },
  { name: 'football_field', description: '🏈#American football' },
  { name: 'soccer_field', description: '⚽#Soccer field' },
  { name: 'golf_course', description: '⛳#Golf course' },
  { name: 'bowling_alley', description: '🎳#Bowling alley' },
  // { name: 'wall_run', description: '🧱#Wall run' },
  
  { name: 'castle', description: '🏰#Medieval castle' },
  { name: 'city_block', description: '🏙️#Urban city block' },
  { name: 'dominoes', description: '🎲#Domino Line' },
  { name: 'hardcore_parkour', description: '🏃‍♂️#Hardcore Parkour' },
]
