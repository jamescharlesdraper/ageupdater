/*
* Age updater plugin
*
* @author James Draper <jjdraper@pm.pm>
* @version 2.1.18
*/
(function () {
	
	CKEDITOR.plugins.add('ageupdater', {

		lang: [ 'en', 'bg', 'pt', 'pt-br', 'ja', 'hu', 'it', 'fr', 'tr', 'ru', 'de', 'ar', 'nl', 'pl', 'vi', 'zh', 'el', 'he', 'es', 'nb', 'nn', 'fi', 'et', 'sk', 'cs', 'ko', 'eu', 'uk'],
		

		init: function (editor) {
			

			editor.addCommand('ageupdater', new CKEDITOR.dialogCommand('ageupdater', {
				allowedContent: 'div{*}(*); iframe{*}[!width,!height,!src,!frameborder,!allowfullscreen,!allow]; object param[*]; a[*]; img[*]'
			}));

			editor.ui.addButton('ageupdater', {
				label : editor.lang.ageupdater.button,
				toolbar : 'insert',
				command : 'ageupdater',
				icon : this.path + 'images/icon.png'
			});

			CKEDITOR.dialog.add('ageupdater', function (instance) {
			
				disabled = editor.config.youtube_disabled_fields || [];

				return {
					title : editor.lang.ageupdater.title,
					minWidth : 510,
					minHeight : 200,
					onShow: function () {
						for (var i = 0; i < disabled.length; i++) {
							this.getContentElement('youtubePlugin', disabled[i]).disable();
						}
					},
					contents :
						[{
							id : 'youtubePlugin',
							expand : true,
							elements :
								[
								{
									type : 'html',
									html : '<span style="text-decoration: underline !important;"><b>'+ editor.lang.ageupdater.txtAgeFrom + '</span></b><hr>'
								},
								{
									type : 'hbox',
									widths : [ '15%', '15%', '15%' ],
									children :
									[
								
										{
											type : 'text',
											id : 'txtDay',
											width : '60px',
											label : editor.lang.ageupdater.txtDay,
											'default' : editor.config.youtube_width != null ? editor.config.youtube_width : '25',
											validate : function () {
												if (this.getValue()) {
													var width = Number(this.getValue());

													if (isNaN(width)) {
														alert(editor.lang.ageupdater.invalidWidth);
														return false;
													}
												}
												else {
													alert(editor.lang.ageupdater.noWidth);
													return false;
												}
											}
										},
										{
											type : 'text',
											id : 'txtMonth',
											width : '60px',
											label : editor.lang.ageupdater.txtMonth,
											'default' : editor.config.youtube_height != null ? editor.config.youtube_height : '06',
											validate : function () {
												if (this.getValue()) {
													var height = Number(this.getValue());

													if (isNaN(height)) {
														alert(editor.lang.ageupdater.invalidHeight);
														return false;
													}
												}
												else {
													alert(editor.lang.ageupdater.noHeight);
													return false;
												}
											}
										},
										{
											type : 'text',
											id : 'txtYear',
											width : '60px',
											label : editor.lang.ageupdater.txtYear,
											'default' : editor.config.youtube_height != null ? editor.config.youtube_height : '2002',
											validate : function () {
												if (this.getValue()) {
													var height = Number(this.getValue());

													if (isNaN(height)) {
														alert(editor.lang.ageupdater.invalidHeight);
														return false;
													}
												}
												else {
													alert(editor.lang.ageupdater.noHeight);
													return false;
												}
											}
										}
									]
								},
								{
									type : 'html',
									html : '<span style="text-decoration: underline !important;"><b>'+ editor.lang.ageupdater.textDimensions + '<b></span>'
								},
								{
									type : 'hbox',
									widths : [ '25%', '25%', '75%' ],
									children :
										[
											{
												type : 'text',
												id : 'txtWidth',
												width : '60px',
												label : editor.lang.ageupdater.txtWidth,
												'default' : editor.config.youtube_height != null ? editor.config.youtube_height : '90',
												validate : function () {
									
												}
											},
											{
												type : 'text',
												id : 'txtHeight',
												width : '60px',
												label : editor.lang.ageupdater.txtHeight,
												'default' : editor.config.youtube_height != null ? editor.config.youtube_height : '19',
												validate : function () {
					
												}
											}
										
										]
								},
								{
									type : 'hbox',
									widths : [ '25%', '25%', '75%' ],
									children :
										[
											{
												type : 'text',
												id : 'txtlineHeight',
												width : '60px',
												label : editor.lang.ageupdater.txtlineHeight,
												'default' : editor.config.youtube_height != null ? editor.config.youtube_height : '26',
												validate : function () {
									
												}
											},
											{
												type : 'text',
												id : 'txtfontSize',
												width : '60px',
												label : editor.lang.ageupdater.txtfontSize,
												'default' : editor.config.youtube_height != null ? editor.config.youtube_height : '16',
												validate : function () {
					
												}
											}
										
										]
								},
								{
									id : 'txtbefore',
									type : 'text',
									label : editor.lang.ageupdater.textBefore + ':',
									onChange : function (api) {
										handleEmbedChange(this, api);
									},
									onKeyUp : function (api) {
										handleEmbedChange(this, api);
									},
									validate : function () {
							
									}
								},
								{
									id : 'txtafter',
									type : 'text',
									label : editor.lang.ageupdater.textAfter + ':',
									onChange : function (api) {
										handleEmbedChange(this, api);
									},
									onKeyUp : function (api) {
										handleEmbedChange(this, api);
									},
									validate : function () {
						
									}
								}
								
							]
						}
					],
					onOk: function()
					{
						var content = '';
					
						var url = '';
						var day = this.getValueOf('youtubePlugin', 'txtDay');
						var month = this.getValueOf('youtubePlugin', 'txtMonth');
						var year = this.getValueOf('youtubePlugin', 'txtYear');
						var width = this.getValueOf('youtubePlugin', 'txtWidth');
						var height = this.getValueOf('youtubePlugin', 'txtHeight');
						var lineHeight = this.getValueOf('youtubePlugin', 'txtlineHeight');
						var fontSize = this.getValueOf('youtubePlugin', 'txtfontSize');
						var txtbefore = this.getValueOf('youtubePlugin', 'txtbefore');
						var txtafter = this.getValueOf('youtubePlugin', 'txtafter');

					

				
						

						
						url += "/plugins/ageupdater/scripts/agecalculator.php?age=";
						url += '' + month ;
						url += '-' + day ;
						url += '-' + year ;
						url += '-' + lineHeight;
						url += '-' + fontSize;
						url += '-' + txtbefore;
						url += '-' + txtafter;


						content += '<iframe ' + 'width="' + width +'" height="' + height +  '" src="' + url + '" ';
						content += 'frameborder="0"></iframe>';
			

						var element = CKEDITOR.dom.element.createFromHtml(content);
						var instance = this.getParentEditor();
						instance.insertElement(element);
					}
				};
			});
		}
	});
})();
