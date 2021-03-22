am4core.ready(() => {

    am4core.useTheme(am4themes_animated);
    
    
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    
    chart.data = [{
     "spending": "Food",
     "moneySpent": 2025
    }, {
     "spending": "Subscriptions",
     "moneySpent": 1882
    }, {
     "spending": "Shoping",
     "moneySpent": 1322
    }, {
     "spending": "Transportation ",
     "moneySpent": 1122
    }, {
     "spending": "Utilities ",
     "moneySpent": 1114
    }, {
     "spending": "Bills",
     "moneySpent": 1500
    }];
    
    chart.padding(40, 40, 40, 40);
    
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "spending";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    // valueAxis.rangeChangeDuration = 1500;
    
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "spending";
    series.dataFields.valueY = "moneySpent";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;
    //series.interpolationDuration = 1500;
    //series.interpolationEasing = am4core.ease.linear;
    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
    
    chart.zoomOutButton.disabled = true;
    
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", (fill, target) => chart.colors.getIndex(target.dataItem.index));
    
    setInterval(function () {
     am4core.array.each(chart.data, function (item) {
       item.moneySpent += Math.round(Math.random() * 200 - 100);
       item.moneySpent = Math.abs(item.moneySpent);
     })
     chart.invalidateRawData();
    }, 2000)
    
    categoryAxis.sortBySeries = series;
    
    }); // end am4core.ready()