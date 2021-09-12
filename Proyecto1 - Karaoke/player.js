function getSong(){

    var songSearch = document.getElementById("songSearch").value;
    document.getElementById("lyrics").textContent = "";
      $.ajax({
        type: "GET",
        data: {
            apikey:"f38dc7ad3a30945e1c4002cee7f89824",
            q_track_artist: songSearch,
            f_has_lyrics: 1,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
            console.log(data.message.body.track_list)
            console.log(data.message.body.track_list[0].track.track_name)
            console.log(data.message.body.track_list[0].track.artist_name)
            var firstTrack = data.message.body.track_list[0]
    
            var p = document.createElement("p");
            p.textContent = firstTrack;
            p.id = firstTrack;

    
            document.getElementById("lyrics").appendChild(p).style.opacity = 0;
            getLyrics(data.message.body.track_list[0].track.track_id);
            
    
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }    
      });
     };

     function getLyrics(trackId){
      $.ajax({
        type: "GET",
        data: {
            apikey:"f38dc7ad3a30945e1c4002cee7f89824",
            track_id: trackId,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
           console.log(data); console.log(data.message.body.lyrics.lyrics_body); 
          var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "...";
           
            var j = document.createElement("p")
            j.textContent = lyricsBody
            document.getElementById("lyrics").appendChild(j)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }    
      });
     };