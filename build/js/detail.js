$(function() {
  return $('.comment').on('click', function(e) {
    var commentId, target, toId;
    target = $(this);
    toId = target.data('id');
    commentId = target.data('cid');
    $('<input>').attr({
      type: 'hidden',
      name: 'comment[tid]',
      value: toId
    }).appendTo('#commentForm');
    return $('<input>').attr({
      type: 'hidden',
      name: 'comment[cid]',
      value: toId
    }).appendTo('#commentForm');
  });
});
