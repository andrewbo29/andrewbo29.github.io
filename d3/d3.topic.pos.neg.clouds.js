

wordScale=d3.scale.linear().domain([-0.8, -0.3, -0.1, -0.01, 0.01, 0.1, 0.3, 0.8]).range([-95, 60, -30, -10, 10, 30, 60, 95]).clamp(true);
wordColor=d3.scale.linear().domain([-1, 1]).range(["red","green"]);

function topic_clouds(topic_words_csv, element_id_positive, element_id_negative) {
  d3.csv(topic_words_csv, function(topic) {
    
    d3.layout.cloud().size([300, 300])
  //      .words([{"text":"test","size":wordScale(.01)},{"text":"bad","size":wordScale(1)}])
        .words(topic.filter(function(d) { return d.word_in_topic_weight > 0; }))
        .rotate(function() { return ~~(Math.random() * 2) * 5; })
        .fontSize(function(d) { 
          return wordScale(Math.abs(d.word_in_topic_weight)); 
        })
        .on("end", draw3(true))
        .start();

    
    d3.layout.cloud().size([350, 300])
  //      .words([{"text":"test","size":wordScale(.01)},{"text":"bad","size":wordScale(1)}])
        .words(topic.filter(function(d) { return d.word_in_topic_weight < 0; }))
        .rotate(function() { return ~~(Math.random() * 2) * 5; })
        .fontSize(function(d) { 
          return wordScale(Math.abs(d.word_in_topic_weight)); 
        })
        .on("end", draw3(false))
        .start();

    function draw3(is_pos) {
      return function draw2(words) {
        
        svg_ind = is_pos ? 2*topic[0].topic : 2*topic[0].topic + 1
        element_id = is_pos ? element_id_positive : element_id_negative
        viz1 = d3.select("#" + element_id);
            
          viz1
          .attr('height', 300)
          .attr('width', 360)
          .append("g")
            .attr("transform", "translate(180,150)")
          .selectAll("text")
            .data(
              words
            )
          .enter().append("text")        
            .style("font-size", function(d) { 
              return Math.abs(d.size) + "px"; 
            })
            .style("fill", function(d) { 
              return d.word_in_topic_weight > 0 ? "green" : "red"; 
            })//wordColor(d.size); })
            .style("opacity", .75)
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
        
        // viz1
        //     .append("text")
        //     .data([topic[0]])
        //     .style("font-size", 20)
        //     .style("font-weight", 900)
        //     .attr("text-anchor", "middle")
        //     .style("fill", is_pos ? "green" : "red")
        //     .attr("x", 100)
        //     .attr("y", 15)
        //     .text(function(d) { return "Topic #" + d.topic + (is_pos ? " positive" : " negative"); })

      }
    }


  })
}
