﻿var FuzzyCriteriaItemForm = function FuzzyCriteriaItemForm(cfg)
{
    let frm = new PanelModal(
        {
            Id: cfg.Id,
            Label: "Fuzzy Project Item",
            Theme: cfg.Theme
        }
    );

    let panel;

    let btnAddItem;
    let btnDelete;

    let _schema = new FuzzyItem();

    construct();

    function construct()
    {
        panel = new FrameForm(
            {
                Id: cfg.Id,
                Code: cfg.Code,
                Label: "Fuzzy Logic Membership",
                StatusType: StatusType.Edit,
                DeepJoin: false,
                ShowLabel: false,
                AddDefaultOption: false,
                AllowSelectParent: false,
                EnableAssociation: true,
                Schema: _schema,
                PageSize: DEFAULT_PAGE_SIZE,
                //Desktop: cfg.Desktop,
                FrameType: FrameType.Bordered,
                ReferenceType: ReferenceType.Struct,
                Connector: cfg.Connector,
                Theme: cfg.Theme,
                Data: cfg.Data,
                User: cfg.User,
                FormColumns: 2,
                ContentUrl: null,
                QueryMode: QueryMode.Struct,
                QueryFunction: null,
                GetServerTime: cfg.GetServerTime,
                //GetLookupDataFunction: function (dbtable, grid)
                //{
                //},
                //GetDataFunction: function (onResponse)
                //{
                //},
                SaveDataFunction: function (data, onResponse)
                {
                    addData(data);
                },
                DeleteDataFunction: function (data, onResponse)
                {
                    deleteData(data);
                }
            }
        );

        frm.Body.appendChild(panel);

        btnAddItem = Inputs.CreateButton({
            Id: cfg.Id.concat("btnAddItem"), Name: " Add", ButtonType: ButtonType.Button, Class: cfg.Theme.ButtonClass, 
            Icon: "fas fa-plus", Label: "Add Item Criteria",
            OnClick: function (e)
            {
                let data = panel.GetData();
                addData(data);
            }
        });
        frm.AddButton(btnAddItem);

        if (cfg.Data != null && cfg.Data.Name != null && cfg.Data.Name != "")
        {
            btnDelete = Inputs.CreateButton({
                Id: cfg.Id.concat("btnDelete"), Name: " Remove", ButtonType: ButtonType.Button, Class: cfg.Theme.ButtonClass,
                Icon: "fas fa-minus", Label: "Remove Item Criteria",
                OnClick: function (e)
                {
                    let data = panel.GetData();
                    deleteData(data);
                }
            });
            frm.AddButton(btnDelete);
        }

        if (cfg.Data.Name == null)
        {
            cfg.Data.Name = "";
            cfg.Data.FuzzyItemCriterias = [];

            let modelItemCriteria1 = {
                Id: cfg.Data.Id,
                Name: "",
                FuzzyItemId: cfg.Data.Id,
                Min: 0,
                Max: 0
            };
            cfg.Data.FuzzyItemCriterias.push(modelItemCriteria1);

            let modelItemCriteria2 = {
                Id: cfg.Data.Id,
                Name: "",
                FuzzyItemId: cfg.Data.Id,
                Min: 0,
                Max: 0
            };
            cfg.Data.FuzzyItemCriterias.push(modelItemCriteria2);
        }
        else
        {
            if (cfg.Data.CriteriaType == Kenviro.CriteriaType.Matter)
            {
                cfg.Data.CriteriaType = Kenviro.CriteriaType.Indication;
            }
        }

        panel.LoadData(cfg.Data, _schema);
    }

    function addData(data)
    {
        if (!panel.IsValid())
        {
            return;
        }

        if (cfg.OnAdd != null)
        {
            cfg.OnAdd(data);
        }

        frm.Close();
    }

    function deleteData(data)
    {
        if (!panel.IsValid())
        {
            return;
        }

        if (cfg.OnDelete != null)
        {
            cfg.OnDelete(data);
        }

        frm.Close();
    }


    return frm;
}