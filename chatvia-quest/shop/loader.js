TweenMax.set('#platform, #giftcontain, #bag, #cart', {
    visibility: 'visible' });
  
  TweenMax.set('.baghandle', {
    transformOrigin: '20% 50%' });
  
  
  function gift() {
    var tl = new TimelineMax();
  
    tl.add('start');
    tl.fromTo('#gift', 1, {
      y: -500 },
    {
      y: 0,
      ease: Bounce.easeOut },
    'start+=1');
    tl.fromTo('#giftshadow', 0.8, {
      scale: 0,
      opacity: 0 },
    {
      scale: 1,
      opacity: 0.5,
      ease: Bounce.easeOut },
    'start+=1');
    tl.fromTo('#ribbon', 0.5, {
      y: 0 },
    {
      y: -50,
      ease: Elastic.easeOut.config(3, 0.3) },
    'start+=0.85');
    tl.to('#ribbon', 0.5, {
      y: 0,
      ease: Elastic.easeOut.config(1.75, 0.3) },
    'start+=1.35');
    tl.to('#giftcontain', 0.25, {
      opacity: 0,
      ease: Sine.easeIn },
    'start+=3');
    tl.to('#giftshadow', 0.1, {
      opacity: 0,
      ease: Sine.easeIn },
    'start+=2.9');
  
    return tl;
  }
  
  function bag() {
    var tl = new TimelineMax();
  
    tl.add('start2');
    tl.fromTo('#bagalone', 1, {
      y: -500 },
    {
      y: 0,
      ease: Bounce.easeOut },
    'start2');
    tl.fromTo('#bagshadow', 0.8, {
      scale: 0,
      opacity: 0 },
    {
      scale: 1,
      opacity: 0.5,
      ease: Bounce.easeOut },
    'start2');
    tl.fromTo('.baghandle', 2, {
      scaleY: 0.5 },
    {
      scaleY: 1,
      ease: Elastic.easeOut.config(3, 0.3) },
    'start2');
    tl.to('#bagshadow', 0.1, {
      opacity: 0,
      ease: Sine.easeIn },
    'start2+=1.4');
    tl.to('#bag', 1, {
      opacity: 0,
      ease: Sine.easeIn },
    'start2+=1.5');
  
    return tl;
  }
  
  function cart() {
    var tl = new TimelineMax();
  
    tl.add('start3');
    tl.fromTo('#cartalone', 1, {
      y: -500 },
    {
      y: 0,
      ease: Bounce.easeOut },
    'start3');
    tl.fromTo('#cartshadow', 0.8, {
      scale: 0,
      opacity: 0 },
    {
      scale: 1,
      opacity: 0.5,
      ease: Bounce.easeOut },
    'start3');
    tl.fromTo('#arrow', 0.5, {
      y: -200,
      opacity: 0 },
    {
      y: 0,
      opacity: 1,
      ease: Bounce.easeOut },
    'start3+=1');
    tl.to('#cartshadow', 0.1, {
      opacity: 0,
      ease: Sine.easeIn },
    'start3+=2.0');
    tl.to('#cart', 1, {
      opacity: 0,
      ease: Sine.easeIn },
    'start3+=2.1');
  
    return tl;
  }
  
  var master = new TimelineMax({ repeat: -1 });
  master.add(gift(), 'gift');
  master.add(bag(), 'bag');
  master.add(cart(), 'cart');
  
  //master.timeScale(0.3)
  //master.seek('cart')