import pandas as pd

df = pd.read_csv('c:/Users/ASUS/Desktop/Prite/Project/pickamovie4u/public/data/linearData.csv')

def movieInsert(n):
    data = df.loc[n]
    Title = str(data["Title"])
    Synopsis = str(data["Synopsis"])
    Action = float(data["Action"])
    War = float(data["War"])
    Adventure = float(data["Adventure"])
    Comedy = float(data["Comedy"])
    Drama = float(data["Drama"])
    Romance = float(data["Romance"])
    SciFi = float(data["Sci-Fi"])
    Fantasy = float(data["Fantasy"])
    Horror = float(data["Horror"])
    Mystery = float(data["Mystery"])
    Crime = float(data["Crime"]) 
    Animation = float(data["Animation"])  
    Documentary = float(data["Documentary"]) 
    Rate = float(data["Rate"])
    
    Title = "{}Title{}: {}{}{}".format("\"", "\"", "\"", Title, "\"")
    Synopsis = "{}Synopsis{}: {}{}{}".format("\"", "\"", "\"", Synopsis, "\"")
    Action = "{}Action{}: {}".format("\"", "\"", Action)
    War = "{}War{}: {}".format("\"", "\"", War)
    Adventure = "{}Adventure{}: {}".format("\"", "\"", Adventure)
    Comedy = "{}Comedy{}: {}".format("\"", "\"", Comedy)
    Drama = "{}Drama{}: {}".format("\"", "\"", Drama)
    Romance = "{}Romance{}: {}".format("\"", "\"", Romance)
    SciFi = "{}SciFi{}: {}".format("\"", "\"", SciFi)
    Fantasy = "{}Fantasy{}: {}".format("\"", "\"", Fantasy)
    Horror = "{}Horror{}: {}".format("\"", "\"", Horror)
    Mystery = "{}Mystery{}: {}".format("\"", "\"", Mystery)
    Crime = "{}Crime{}: {}".format("\"", "\"", Crime)
    Animation = "{}Animation{}: {}".format("\"", "\"", Animation)
    Documentary = "{}Documentary{}: {}".format("\"", "\"", Documentary)
    Rate = "{}Rate{}: {}".format("\"", "\"", Rate)
    
    return f"{'{'}{Title}, {Synopsis}, {Action}, {War}, {Adventure}, {Comedy}, {Drama}, {Romance}, {SciFi}, {Fantasy}, {Horror}, {Mystery}, {Crime}, {Animation}, {Documentary}, {Rate}{'}'}"

n = 150
print(movieInsert(n-1))