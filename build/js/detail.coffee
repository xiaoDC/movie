$ ()->
    $('.comment').on 'click', (e)->
        target = $ this
        toId = target.data 'id'
        commentId = target.data 'cid'

        $('<input>').attr
            type: 'hidden'
            name: 'comment[tid]'
            value: toId
        .appendTo '#commentForm'

        $('<input>').attr
            type: 'hidden'
            name: 'comment[cid]'
            value: toId
        .appendTo '#commentForm'