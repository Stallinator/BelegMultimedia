# BelegMultimedia Fridjof Bonneß, Etienne Rodriguez, Florian Stallmach

# Vorwort

In diesem Repository finden sie unseren Beleg für das Wintersemester 18/19. Es beinhaltet eine simple DJ/VJ Anwendung, welche in JavaScript entwickelt wurde. Es gibt 2 HTML Seiten, eine für den Audio- und eine für den Videoteil. Die audio.html kann entweder über die UI Elemente, oder bei angeschlossenem MIDI-Controller auch über diesen gesteuert werden. Die Tastenbelegung finden Sie unter #Tastenbelegung. Wir haben uns mit dem Beleg an die von ihnen vorgegebenen Anforderungen gehalten und diese um einige Features erweitert. Als zusätzliches Feature wurde ein Tiefpassfilter hinzugefügt, welcher über die CheckBox aktiviert werden kann und dann mit dem sich darunter befindlichen Slider die Frequenz regelt. Desweiteren gibt es eine Visualisierung der Audiodaten.
Die Lautstärke der Audios kann über die sich darunter befindenden Regler seperat gesteuert werden. Über den Play Button können Sie Audios starten, sowie pausieren. Der nicht-lineare Crossfader befindet sich in der Mitte der beiden Audios unter den Lautstärkereglern. Ganz unten auf der Seite gelangen sie über einen Link zum Videoteil.
Auf dieser Seite angelangt erwarten Sie 2 Videos welche über den Dash Player abgespielt werden können. Über das Lautsprecher Symbol können sie auch hier seperat die Lautstärke verändern. Unter den beiden Playern sehen sie jeweils ein Canvas, auf welchem das Vordergrundvideo durch ChromaKeying herausgefiltert wurde und über ein Bild gelegt wurde, desweiteren lässt sich die Abspielgeschwindigkeit einstellen.
Ganz unten auf der Seite finden Sie den Link zurück zur AudioSeite.

# Installation/Ausführung

1. Laden Sie das GitRepo herunter (klonen es) 
2. Gehen Sie in den obersten Ordner (BelegMultimedia) 
3. Führen Sie 'npm install' in der Konsole aus um alle Pakete zu installieren
4. Starten Sie den Server mit 'npm start' 

Die Seite wird nun in ihrem Standardbrowser geöffnet.

# Tastenbelegung 
Die Tastenbelegung sehen sie in folgendem Bild.
<img src="/doku/tasten.png" alt="TastenbelegungMIDI"/>

# Bugs
In GoogleChrome kommt es abundzu dazu, dass die AudioDateien erst dann spielen wenn der Nutzer etwas gemacht hat.
