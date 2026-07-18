def get_data():
  with open ('data.txt') as file:
    data = file.read()
    datas = data.splitlines()
  return datas