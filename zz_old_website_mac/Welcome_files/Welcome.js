// Created by iWeb 3.0 local-build-20090216

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({shadow_1:new IWShadow({blurRadius:3,offset:new IWPoint(-0.0000,1.0000),color:'#000000',opacity:0.500000}),shadow_2:new IWShadow({blurRadius:3,offset:new IWPoint(-0.0000,1.0000),color:'#000000',opacity:0.500000}),shadow_0:new IWShadow({blurRadius:3,offset:new IWPoint(-0.0000,1.0000),color:'#000000',opacity:0.500000})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Welcome_files/WelcomeMoz.css')
fixAllIEPNGs('Media/transparent.gif');Widget.onload();fixupAllIEPNGBGs();applyEffects()}
function onPageUnload()
{Widget.onunload();}
