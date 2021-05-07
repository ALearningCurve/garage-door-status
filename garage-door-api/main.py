
import firebase_admin
from firebase_admin import credentials, firestore
import time

cred = credentials.Certificate("./garage-door-api/secrets/serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)

db = firestore.client(app=app)

left_door_uid = "OWupDsNVSgHaxPZm0MC8"
right_door_uid = "jUsnSC91PNF7Yhk4ozbm"

docs_map = {}

document_watcher = None

def startMainLoop():
    initSnapshots()
    try:    
        while True:
            handleDoorData(getDistance(), left_door_uid)
            time.sleep(5)
    except KeyboardInterrupt:
        print("Ending API")
        document_watcher and document_watcher.unsubscribe()
        quit()

def getDistance():
    return 5

def handleDoorData(distance, uid):
    
    if (not (uid in docs_map)):
        print("The UID is not in the docs mapping!")
        return
    doc = docs_map[uid]
    isOpen = distance > 20
    if (isOpen != doc._data["open"]):
        updateDoor(isOpen, doc)
    if "needsUpdate" in doc._data and doc._data["needsUpdate"]:
        updateDoor(isOpen, doc)

def updateDoor(isOpen, doc):
    door_ref = db.collection('doors').document(doc.id)

    # Set the capital field
    door_ref.update({
        "needsUpdate": False,
        "open": isOpen,
        "lastUpdated": firestore.SERVER_TIMESTAMP
    })

def initSnapshots():
    document_watcher = db.collection('doors').on_snapshot(on_snapshot)

def on_snapshot(snapshot, changes, read_time):
    for doc in snapshot:
        if (doc.id == left_door_uid):
            docs_map[left_door_uid] = doc
        elif (doc.id == right_door_uid):
            docs_map[right_door_uid] = doc
        print("\n",doc.id, doc._data["name"], doc._data["open"])
        print("------")

startMainLoop()