
$(document).ready(function(){
	draw();

	data = {
		checkSolution: $('button'),
		squares: $('#grid .square'),
		fragments: $('#images .img'),
	}

	$(data.squares).each(function(i){
		$(this).data('offset_pos', $(this).offset());
		$(this).data('related_with', '');
		$(this).data('puzzle_id', i);
	});

	$(data.fragments).each(function(i){
		$(this).data('old_offset_pos', $(this).offset());
		$(this).data('old_css_pos', {left: $(this).css('left'), top: $(this).css('top')});
		$(this).data('related_with', '');
		$(this).data('square_id', i);
	});

	var elems = data.fragments;
	var parent = $('#images')

	// События нажатия
	elems.on('mousedown', function(event) {
	  
	  var elem = $(this);
	  // Делаем, чтобы текущий элемент отображался всегда поверх других.
	  $(elems).css('z-index','2');
	  $(elem).css('z-index','3');
	  // Отвязываем картинку от связанной с ней клетки (если вдруг человек захотел перетащить картинку в другое место)
	  $($(elem).data('related_with')).data('related_with','');
	  $(elem).data('related_with','');

	  var pos = {}

	  // Запомнить позицию курсора относительно элемента
	  pos.inner = {
	    left: event.offsetX,
	    top: event.offsetY
	  }

	  // Событие перетаскивания
	  parent.on('mousemove', function(event) {

	    // Позиция родителя относительно экрана
	    pos.parent = parent.offset();
	    // Позиция курсора относительно экрана
	    pos.cursor = {
	      left: event.pageX,
	      top: event.pageY
	    }

	    // Новая позиция элемента
	    new_pos = {
	      left: pos.cursor.left - pos.parent.left - pos.inner.left,
	      top: pos.cursor.top - pos.parent.top - pos.inner.top
	    }


	    if (new_pos.top > 0 && new_pos.left < 250 ) {
	    	elem.css(new_pos);
	    }
	    
	  });

	  elems.on('mouseup', function() {
	  	var elem = $(this);
	  	var all_squares_filled = true;
	    $(data.squares).each(function(){
	    	
	    	var box_top  = $(this).offset().top;
	    	var box_left = $(this).offset().left;
	    	var box_right = box_left + 120;
	    	var box_bottom = box_top + 120;
	    	// Проверяем, находится ли центр фрагмента в области слота
	    	var puzzle_in_box = ($(elem).offset().left + 60 >= box_left && $(elem).offset().left + 60 <= box_right ) && ($(elem).offset().top + 60 >= box_top && $(elem).offset().top + 60 <= box_bottom);
	      	var filled = $(this).data('related_with');
	      	
	      	//console.log(all_squares_filled);
	      	if (puzzle_in_box) {
	      		if (!filled) {
	      			// Если фрагмент в области слота и слот не занят, то притягиваем фрагмент внутрь слота и добавляем связывание этих двух DOM-объектов.
		      		$(elem).offset({left:box_left+2,top:box_top});
		      		$(this).data('related_with', elem);
		      		$(elem).data('related_with', $(this));
		      		
	      		} else if ($($(elem).data('related_with')).get(0) != $(this).get(0)) {
	      			$(elem).css($(elem).data('old_css_pos'));
	      		}
	      	}
	      	if (!filled) {
	      		all_squares_filled = false;
	      	}
	      	if (all_squares_filled) {
	      		$(data.checkSolution).prop( "disabled", false );
	      	} else {
	      		$(data.checkSolution).prop( "disabled", true );
	      	}
	      	console.log(all_squares_filled);
	    });
	    

	    //  if (new_pos.left > 240 || new_pos.top > 270 || new_pos.top <= -15) {

	    // 	elem.css(oldPos);
	    // }

	    elem.off("mouseup")
	    parent.off("mousemove")
	  });
	});
	$(data.checkSolution).click(function(){
		var puzzle_solved = true;
		$(data.squares).each(function() {

			var required_puzzle_id = $(this).data('puzzle_id');
			var related_puzzle = $(this).data('related_with');
			var related_puzzle_id = $(related_puzzle).data('square_id');

			if (required_puzzle_id != related_puzzle_id ) {
				$(related_puzzle).css($(related_puzzle).data('old_css_pos'));
				$(this).data('related_with', '');
		      	$(related_puzzle).data('related_with','');
		      	puzzle_solved = false;
			}


		});
		if (puzzle_solved) {
			elems.off('mousedown');
			console.log('test_solved');
			setTimeout(function(){
				console.log('test');
  				$('.scene').slideUp(2000);
			}, 2000);
		}	
	});
});