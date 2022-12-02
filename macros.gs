const data_start = 153;
const data_end = 217;

const spreadSheet_name = "Диагностическая сессия";

const flag_true_text = 'ИСТИНА';

const flags_column = 2;
const flags_column_text = 'B';
const data_text_column_text = 'C';
const data_text_column = 3;
const params_column_text = 'G';
const params_column = 6;

const gen_data_columns = new Array("B","C","D","F","H","I","K","M");
const gen_data_row = 222;
const MAX_LENGTH = 24;

var infos = [[],[],[],[],[],[],[],[]];

var ss = SpreadsheetApp.getActive().getSheetByName(spreadSheet_name);


async function onEdit(e)
{ 
  await editTable(e);
}

async function editTable(e)
{
  var rangeObj = e.range;
  var rangeRow = rangeObj.getRow();
  if(rangeRow >= data_start && rangeRow <= data_end && rangeObj.getColumn() == flags_column)
  //if(true)
  {
     
  var flag_values = ss.getRange(flags_column_text+data_start+":"+flags_column_text+data_end).getValues();
  var text_values = ss.getRange(data_text_column_text+data_start+":"+data_text_column_text+data_end).getValues();
  var param_values = ss.getRange(params_column_text+data_start+":"+params_column_text+data_end).getValues();
    for(var i = 0; i < 8; i++)
    {
      ss.getRange(gen_data_columns[i]+gen_data_row+":"+gen_data_columns[i]+(gen_data_row+MAX_LENGTH)).clearContent();
    }

    for(var i = 0; i <= data_end - data_start;i++)
    {
      if(flag_values[i][0])
      {
        var params_list = param_values[i][0].split(",");
        params_list.forEach(function(item, j, arr) 
        {
          if(item != "")
          {
            if(infos[item-1].length < MAX_LENGTH)
            {
              infos[item-1].push([text_values[i][0]]);
            }
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