// Created by iWeb 3.0 local-build-20090216

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-3,3,6,221),url:'About_Me_files/stroke.png'},{rect:new IWRect(-3,-3,6,6),url:'About_Me_files/stroke_1.png'},{rect:new IWRect(3,-3,192,6),url:'About_Me_files/stroke_2.png'},{rect:new IWRect(195,-3,6,6),url:'About_Me_files/stroke_3.png'},{rect:new IWRect(195,3,6,221),url:'About_Me_files/stroke_4.png'},{rect:new IWRect(195,224,6,6),url:'About_Me_files/stroke_5.png'},{rect:new IWRect(3,224,192,6),url:'About_Me_files/stroke_6.png'},{rect:new IWRect(-3,224,6,6),url:'About_Me_files/stroke_7.png'}],new IWSize(198,227)),shadow_0:new IWShadow({blurRadius:2,offset:new IWPoint(0.0000,-0.0000),color:'#000000',opacity:0.300000})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('About_Me_files/About_MeMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');fixAllIEPNGs('Media/transparent.gif');Widget.onload();applyEffects()}
function onPageUnload()
{Widget.onunload();}
