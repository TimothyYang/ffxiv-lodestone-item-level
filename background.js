if ($('.ic_gear', '.param_right_area').length == 0) {
  // If there currently isn't an ilvl
  var iLvl = calculateILvl();
  insertILvl(iLvl);
}

function calculateILvl() {
  var weapon = $('#param_class_info_area').find('.pt3');
  var weaponILvl = parseInt(weapon[0].innerHTML.split(" ").pop());

  var equips = $('.param_right_area').first().find('.ic_reflection_box');

  var equipsILvls = {
    weapon: 0,
    head: 0,
    body: 0,
    hands: 0,
    waist: 0,
    legs: 0,
    feet: 0,
    offhand: 0,
    necklace: 0,
    earrings: 0,
    bracelets: 0,
    ring1: 0,
    ring2: 0
  };

  equipsILvls['weapon'] = weaponILvl;

  $.each(equips, function(i, v) {
    var iLvlText = $(v).find('.pt3');

    if (i == equips.length - 1) {
      // Ignore soulstone slot
    } else if (iLvlText.length == 0 && i == 6) {
      // Handle no offhand slot
      equipsILvls['offhand'] = weaponILvl;
    } else if (iLvlText.length == 1) {
      var curILvl = parseInt(iLvlText[0].innerHTML.split(" ").pop());

      equipsILvls[mapGear(i)] = curILvl;

      // Handle 'cannot equip gear to'
      var gearText = $(v).find('.popup_w412_body_inner')[1].innerHTML;
      if (gearText.indexOf('Cannot equip gear to') != -1) {
        if (gearText.indexOf('head') != -1) {
          equipsILvls['head'] = curILvl;
        } else if (gearText.indexOf('hands') != -1) {
          equipsILvls['hands'] = curILvl;
        } else if (gearText.indexOf('legs') != -1) {
          equipsILvls['legs'] = curILvl;
        } else if (gearText.indexOf('feet') != -1) {
          equipsILvls['feet'] = curILvl;
        }
      }
    }
  });

  var sum = 0;
  for(var slot in equipsILvls) {
    if(equipsILvls.hasOwnProperty(slot) ) {
      sum += equipsILvls[slot];
    }
  }

  return Math.floor(sum/13);
}

function mapGear(i) {
  switch (i) {
    case 0: return 'head';
    case 1: return 'body';
    case 2: return 'hands';
    case 3: return 'waist';
    case 4: return 'legs';
    case 5: return 'feet';
    case 6: return 'offhand';
    case 7: return 'necklace';
    case 8: return 'earrings';
    case 9: return 'bracelets';
    case 10: return 'ring1';
    case 11: return 'ring2';
  }
}

function insertILvl(ilvl) {
  ilvl = ilvl.toString();

  while (ilvl.length < 4) {
    ilvl = '0' + ilvl;
  }

  $('<div class="ic_gear">' + ilvl + '</div>').insertAfter('.param_img_cover');
}


