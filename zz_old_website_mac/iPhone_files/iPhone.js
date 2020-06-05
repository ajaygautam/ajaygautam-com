// Created by iWeb 3.0 local-build-20090216

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWPhotoFrame([IWCreateImage('iPhone_files/Watercolor_iweb_01.png'),IWCreateImage('iPhone_files/Watercolor_iweb_02.png'),IWCreateImage('iPhone_files/Watercolor_iweb_04.png'),IWCreateImage('iPhone_files/Watercolor_iweb_08.png'),IWCreateImage('iPhone_files/Watercolor_iweb_16.png'),IWCreateImage('iPhone_files/Watercolor_iweb_14.png'),IWCreateImage('iPhone_files/Watercolor_iweb_13.png'),IWCreateImage('iPhone_files/Watercolor_iweb_05.png')],null,0,0.800000,0.000000,0.000000,0.000000,0.000000,12.000000,12.000000,11.000000,11.000000,13.000000,12.000000,13.000000,12.000000,null,null,null,0.500000)});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('iPhone_files/iPhoneMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');fixAllIEPNGs('Media/transparent.gif');Widget.onload();applyEffects()}
function onPageUnload()
{Widget.onunload();}
