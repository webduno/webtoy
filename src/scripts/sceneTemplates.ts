// Template definitions for the 3D scene
const PHYSICS_TEST = [{"position":[0,-0.5611186449722975,0],"rotation":[0,0,0],"scale":[9.475172487582173,0.6155249373422851,9.475172487582173],"color":"777777","hasGravity":false},{"position":[0,0,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"777777","hasGravity":false},{"position":[0,2.472572019683369,0],"rotation":[-0.5884172948570177,0.2210228494883355,0.5884172948570178],"scale":[0.6525083472183528,0.6525083472183528,0.6525083472183528],"color":"777777","hasGravity":false},{"position":[0,3.9631697162337187,0],"rotation":[-0.4693766980066377,0.29156384862405865,0.4693766980066377],"scale":[1,1,1],"color":"ffd500","hasGravity":true},{"position":[0,5.532869935566511,0],"rotation":[0,0,0],"scale":[1,1,1],"color":"ff7300","hasGravity":true}]
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
const CITY_BLOCK = [
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[20,0.1,20],"color":"aaaaaa"},
  {"position":[-5,2,-5],"rotation":[0,0,0],"scale":[3,4,3],"color":"6688aa"},
  {"position":[5,3,-5],"rotation":[0,0,0],"scale":[3,6,3],"color":"bb9988"},
  {"position":[5,1.5,5],"rotation":[0,0,0],"scale":[3,3,3],"color":"99aa88"},
  {"position":[-6.361359701276022,6.021861735353015,2.840797083960137],"rotation":[0,0,0],"scale":[2.4604933930016166,12.132248965179018,2.4604933930016166],"color":"ffffff"},
  {"position":[-2.911074508714476,3.538407129639231,8.1889889750765],"rotation":[0,0,0],"scale":[2.128927458420069,7.093500419266534,2.128927458420069],"color":"ffffff"},
  {"position":[0,0.06,0],"rotation":[0,0,0],"scale":[0.5,0.01,18],"color":"ffffff"},
  {"position":[0,0.06,0],"rotation":[0,0,0],"scale":[18,0.01,0.5],"color":"ffffff"},
  {"position":[3,0.3,2],"rotation":[0,0.3,0],"scale":[0.8,0.3,1.4],"color":"cc3333"},
  {"position":[2.7,0.6,2],"rotation":[0,0.3,0],"scale":[0.6,0.25,0.7],"color":"336699"},
  {"position":[3.2,0.15,1.6],"rotation":[0,0.3,0],"scale":[0.2,0.2,0.2],"color":"222222"},
  {"position":[2.8,0.15,2.4],"rotation":[0,0.3,0],"scale":[0.2,0.2,0.2],"color":"222222"},
  {"position":[-3,0.75,2],"rotation":[0,0,0],"scale":[0.4,1.5,0.4],"color":"8b4513"},
  {"position":[-3,1.8,2],"rotation":[0,0.2,0],"scale":[1.2,1.2,1.2],"color":"228833"},
  {"position":[4,0.5,-3],"rotation":[0,0,0],"scale":[0.3,1,0.3],"color":"8b4513"},
  {"position":[4,1.25,-3],"rotation":[0,0.3,0],"scale":[0.8,0.8,0.8],"color":"33aa44"},
  {"position":[-8,1,-8],"rotation":[0,0,0],"scale":[0.2,2,0.2],"color":"333333"},
  {"position":[-8,2,-8],"rotation":[0,0,0],"scale":[0.4,0.2,0.4],"color":"ffff99"},
  {"position":[8,1,8],"rotation":[0,0,0],"scale":[0.2,2,0.2],"color":"333333"},
  {"position":[8,2,8],"rotation":[0,0,0],"scale":[0.4,0.2,0.4],"color":"ffff99"},
  {"position":[-2.3931774499231757,0,3.7962060318198336],"rotation":[0,0,0],"scale":[1,1,1],"color":"aeaed0"},
  {"position":[2.0703085119890035,6.600628599931982,1.9757186886635445],"rotation":[0,0,0],"scale":[1,0.6670564416090144,4.5692587330367065],"color":"9d9daa"},
  {"position":[1.8367803942926528,6.3894102564725,-3.4389758843552185],"rotation":[0,0,-0.4838127857293179],"scale":[0.7058776349920409,0.14544930515772972,5.241211803927037],"color":"d5a46c"},
  {"position":[3.2777481071386427,6.116330096025057,-5.974242850712737],"rotation":[0.23991270909642906,-0.009945372372252981,-0.10210847708252374],"scale":[7.813503517104752,0.26486776599161266,2.0208508464501262],"color":"d5a46c"},
  {"position":[2.1297765288638297,7.013772641041847,-6.8589577884784605],"rotation":[0,0,0],"scale":[1,1.7874551255079683,0.35396833341135053],"color":"938b58"},
  {"position":[0,-0.4690937239869515,0],"rotation":[0,0,0],"scale":[21.871625972152124,0.9224561347760419,21.871625972152124],"color":"9f9fa8"},
  {"position":[0.8262971261872782,3.1405213844717395,-6.102246048531755],"rotation":[0,0,0],"scale":[0.7737929279361688,7.526264279099656,0.7737929279361688],"color":"787882"}
];

// Medieval castle template
const CASTLE = [
  {"position":[0,0,0],"rotation":[0,0,0],"scale":[12,0.5,12],"color":"7d8471"}, // Castle base/ground
  {"position":[0,2,0],"rotation":[0,0,0],"scale":[8,4,8],"color":"a9a9a9"}, // Main castle structure
  {"position":[0,4.5,0],"rotation":[0,0,0],"scale":[8.5,0.5,8.5],"color":"808080"}, // Top wall trim
  {"position":[-4,5.75,-4],"rotation":[0,0,0],"scale":[1,2,1],"color":"a9a9a9"}, // Corner tower NW
  {"position":[4,5.75,-4],"rotation":[0,0,0],"scale":[1,2,1],"color":"a9a9a9"}, // Corner tower NE
  {"position":[4,5.75,4],"rotation":[0,0,0],"scale":[1,2,1],"color":"a9a9a9"}, // Corner tower SE
  {"position":[-4,5.75,4],"rotation":[0,0,0],"scale":[1,2,1],"color":"a9a9a9"}, // Corner tower SW
  {"position":[-4,7,-4],"rotation":[0,0,0],"scale":[1.2,0.5,1.2],"color":"808080"}, // Tower top NW
  {"position":[4,7,-4],"rotation":[0,0,0],"scale":[1.2,0.5,1.2],"color":"808080"}, // Tower top NE
  {"position":[4,7,4],"rotation":[0,0,0],"scale":[1.2,0.5,1.2],"color":"808080"}, // Tower top SE
  {"position":[-4,7,4],"rotation":[0,0,0],"scale":[1.2,0.5,1.2],"color":"808080"}, // Tower top SW
  {"position":[0,2,4.5],"rotation":[0,0,0],"scale":[2,3,1],"color":"8b7355"}, // Main gate/entrance
  {"position":[0,3,4.75],"rotation":[0,0,0],"scale":[1.5,1.5,0.5],"color":"4b3621"}, // Gate door
  {"position":[0,7,0],"rotation":[0,0,0],"scale":[2,4,2],"color":"a9a9a9"}, // Central keep/tower
  {"position":[0,9.5,0],"rotation":[0,0,0],"scale":[2.5,0.5,2.5],"color":"808080"}, // Keep top
  {"position":[0,10.5,0],"rotation":[0,0,0],"scale":[0.5,1.5,0.5],"color":"a9a9a9"}, // Flagpole
  {"position":[0.3,11.5,0],"rotation":[0,0,0],"scale":[1,0.8,0.1],"color":"b22222"}, // Red flag
  {"position":[-3.5,5,-4],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[-4,5,-3.5],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[-3.5,5,4],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[-4,5,3.5],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[3.5,5,4],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[4,5,3.5],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[3.5,5,-4],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[4,5,-3.5],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[-2,5,4],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[2,5,4],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[-2,5,-4],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[2,5,-4],"rotation":[0,0,0],"scale":[0.2,0.2,0.2],"color":"696969"}, // Merlon
  {"position":[0,0.3,0],"rotation":[0,0,0],"scale":[5,0.1,5],"color":"708090"}, // Courtyard
  {"position":[-2,1.5,0],"rotation":[0,0,0],"scale":[1,2.5,1],"color":"696969"}, // Inner building
  {"position":[2,1.5,0],"rotation":[0,0,0],"scale":[1,2.5,1],"color":"696969"}, // Inner building
  {"position":[0,1.5,-2],"rotation":[0,0,0],"scale":[1,2.5,1],"color":"696969"}, // Inner building
  {"position":[0,0.2,7],"rotation":[0,0,0],"scale":[4,0.2,2],"color":"4682b4"}, // Moat
  {"position":[0,0.15,6],"rotation":[0,0,0],"scale":[2,0.1,1],"color":"8b7355"} // Drawbridge
];

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

/**
 * Get template data based on the template name
 * @param templateName - The name of the template to retrieve
 * @returns The template data array or null if not found
 */
export function getTemplateData(templateName: string | null): any[] | null {
  if (!templateName) return null;
  
  switch (templateName) {
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
      
    default:
      return null;
  }
} 


export const DEFAULT_TEMPLATE_LIST = [
  // { name: 'physics_test', description: 'Physics test' },
  { name: 'const_house', description: 'Simple house construction' },
  { name: 'garden_parkour', description: 'Garden with trees and flowers' },
  { name: 'mountain_view', description: 'Mountain landscape' },
  { name: 'city_block', description: 'Urban city block' },
  { name: 'bowling_alley', description: 'Simple bowling alley' },
  { name: 'castle', description: 'Medieval castle' },
]
