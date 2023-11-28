export default class DialogSimilarInspirer {
  constructor(dialogId, dialogName) {
    this.dialogId = dialogId
    this.dialogName = dialogName
  }

    openDialog() {
      var dialogId = this.dialogId
      var dialogName = this.dialogName
      var resposive_width = ($( window ).width() > 576) ? 445 : ($( window ).width() - 20);

      $(dialogId).dialog({
            minWidth: resposive_width,
            autoOpen: false,
            draggable: true,
            modal:true,
            resizable: false,
            open: function (event, ui) {
                $(dialogId).css('overflow', 'hidden');
                $('.ui-widget-overlay').css({ opacity: '.5' });
                $('.ui-widget-overlay').bind('click', function()
                {
                    $(dialogId).dialog('close');
                });
            }
        });
      $('.item-inner .item-tooltip').addClass('hidden');
        $('.thumb.'+dialogName).on('click', function (e) {
            var target = $(e.currentTarget);
            var title = target.attr('data-title');
            var poster = target.attr('data-poster');
            var genre = target.attr('data-genre');
            var wikiUrl = target.attr('data-wikiurl');
            var imdbUrl = target.attr('data-imdburl');
            var imdbId = target.attr('data-imdbid');
            $(dialogId+' .tooltip-meta .my-list .title p').text(title);
            $(dialogId+' .tooltip-meta .my-list .genre p').text(genre);
            $(dialogId+' .tooltip-meta .my-list .poster img').attr("src", poster);
            $(dialogId+' .tooltip-meta .my-list .wikiurl a').attr("href", wikiUrl);
            $(dialogId+' .tooltip-meta .my-list .wikiurl a').text(wikiUrl);
            $(dialogId+' .tooltip-meta .my-list .imdburl a').attr("href", imdbUrl);
            $(dialogId+' .tooltip-meta .my-list .imdburl a').text(imdbId);
            $(dialogId).dialog({
              title: title
            })
            $(dialogId).dialog("open");
        });
  }
}