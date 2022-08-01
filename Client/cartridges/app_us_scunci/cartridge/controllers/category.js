'use strict';
var server = require('server');
//var cache = require('*/cartridge/scripts/middleware/cache');
//var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
//var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
server.get(
    'ShowCategories',
    function (req, res, next) {
        var catalogMgr = require('dw/catalog/CatalogMgr');
        var Categories = require('*/cartridge/models/categories');
        var siteRootCategory = catalogMgr.getSiteCatalog().getRoot();
        var test = 1;
        var topLevelCategories = siteRootCategory.hasOnlineSubCategories() ?
            siteRootCategory.getOnlineSubCategories() : null;
            
        dw.system.Logger.warn('siteRootCategory = '+siteRootCategory);
        dw.system.Logger.warn('topLevelCategories = '+topLevelCategories);
        for(var i = 0 ; i < 6 ; i++)
        {
            dw.system.Logger.warn('My category = '+topLevelCategories[i].ID);
        }
        
        //dw.system.Logger.warn('All Categgories 1= '+Categories.subCategories);
        res.render('components/header/shopMenu' , {
            categories : topLevelCategories
        });
        next();
    }
);
server.get(
    'ShowDropDownCategories',
    function (req, res, next) {
        var catalogMgr = require('dw/catalog/CatalogMgr');
        var Categories = require('*/cartridge/models/categories');
        var siteRootCategory = catalogMgr.getSiteCatalog().getRoot();
        var test = 1;
        var topLevelCategories = siteRootCategory.hasOnlineSubCategories() ?
            siteRootCategory.getOnlineSubCategories() : null;
            
        // dw.system.Logger.warn('siteRootCategory = '+siteRootCategory);
        // dw.system.Logger.warn('topLevelCategories = '+topLevelCategories);
        // for(var i = 0 ; i < 6 ; i++)
        // {
        //     dw.system.Logger.warn('My category = '+topLevelCategories[i].ID);
        // }
        
        //dw.system.Logger.warn('All Categgories 1= '+Categories.subCategories);
        res.render('components/header/shopDropDown' , {
            categories : topLevelCategories
        });
        next();
    }
);
server.get(
    'mShowCategories',
    function (req, res, next) {
        var catalogMgr = require('dw/catalog/CatalogMgr');
        var Categories = require('*/cartridge/models/categories');
        var siteRootCategory = catalogMgr.getSiteCatalog().getRoot();
        var test = 1;
        var topLevelCategories = siteRootCategory.hasOnlineSubCategories() ?
            siteRootCategory.getOnlineSubCategories() : null;
            
        dw.system.Logger.warn('siteRootCategory = '+siteRootCategory);
        dw.system.Logger.warn('topLevelCategories = '+topLevelCategories);
        for(var i = 0 ; i < 6 ; i++)
        {
            dw.system.Logger.warn('My category = '+topLevelCategories[i].ID);
        }
        
        //dw.system.Logger.warn('All Categgories 1= '+Categories.subCategories);
        res.render('components/header/mShowCategories' , {
            categories : topLevelCategories
        });
        next();
    }
);
module.exports = server.exports();
