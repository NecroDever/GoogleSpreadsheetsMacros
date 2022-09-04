const data_start = 297;
const data_end = 361;

const spreadSheet_name = "Статсессия";

const flag_true_text = 'Есть';

const flags_column = 27;
const flags_column_text = 'AA';
const data_text_column_text = 'AN';
const data_text_column = 40;
const params_column_text = 'BH';
const params_column = 60;

const gen_data_columns = new Array("E","P","AA","AL","AU","BD","BN","BZ");
const gen_data_row = 370;
const MAX_LENGTH = 17;

var infos = [[],[],[],[],[],[],[],[]];

var ss = SpreadsheetApp.getActive().getSheetByName(spreadSheet_name);
var flag_values = ss.getRange(flags_column_text+data_start+":"+flags_column_text+data_end).getValues();
var text_values = ss.getRange(data_text_column_text+data_start+":"+data_text_column_text+data_end).getValues();
var param_values = ss.getRange(params_column_text+data_start+":"+params_column_text+data_end).getValues();

async function onEdit(e)
{ 
  await editTable(e);
}

async function editTable(e)
{
  var rangeObj = e.range;
  var rangeRow = rangeObj.getRow();
  if(rangeRow >= data_start && rangeRow <= data_end && rangeObj.getColumn() == flags_column)
  {
    for(var i = 0; i < 8; i++)
    {
      ss.getRange(gen_data_columns[i]+gen_data_row+":"+gen_data_columns[i]+(gen_data_row+MAX_LENGTH)).clearContent();
    }

    for(var i = 0; i <= data_end - data_start;i++)
    {
      if(flag_values[i][0] == flag_true_text)
      {
        var params_list = param_values[i][0].split(",");
        params_list.forEach(function(item, j, arr) 
        {
          if(infos[item-1].length < MAX_LENGTH)
          {
            infos[item-1].push([text_values[i][0]]);
          }
        });
      }
    }
    for(var i = 0; i < 8; i++)
    {
      if(infos[i].length > 0)
      {
          ss.getRange(gen_data_columns[i]+gen_data_row+":"+gen_data_columns[i]+(gen_data_row+infos[i].length-1)).setValues(infos[i]);
      }
    }
  }
}

