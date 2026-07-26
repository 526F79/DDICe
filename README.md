# DDICe: DnD Item Card exporter

Create printable cards for DnD 5.5E items from a CSV file.

# TODO list

- [X] CSV to html converter
- [X] CSS style for the card
- [ ] CSS style for the webpage
- [ ] PDF printer version
- [ ] Print button
- [ ] Single card editor (designer)
- [ ] Item search
    - [ ] Find item on 5e.tools
    - [ ] Add picture

# Usage

You can export a CSV file from pinned items in [5e tools](https://5e.tools/items). The exported file will contain the cgecked columns in the row `5e tools`. The checked columns in `Usage` are being used to create the card.


The next columns are accepted in the CSV files. The order does not matter. Other columns will not be used.

|**Columns**|Name|Source|Page|Rarity|Type|Attunement|Damage|Properties|Mastery|Other|Weight|Value|Text|Image-url|Image-Scale|Image-Rotation|
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|**Usage**|✔️|❌|❌|✔️|✔️|✔️|✔️|✔️|✔️|✔️|✔️|✔️|✔️|✔️|✔️|✔️|
|**5e tools**|✔️|✔️|✔️|✔️|✔️|✔️|✔️|✔️|✔️|❌|✔️|✔️|✔️|❌|❌|❌|