# 🚀 Déploiement du Formulaire Axle IA

## 📍 Lien de déploiement GitHub Pages

**URL du formulaire déployé :** 
```
https://shalom352.github.io/lead-form/
```

## 🔧 Activation de GitHub Pages

### Étapes à suivre :

1. **Allez sur votre repository GitHub :**
   - URL : https://github.com/Shalom352/lead-form

2. **Activez GitHub Pages :**
   - Cliquez sur **Settings** (dans l'onglet en haut)
   - Descendez jusqu'à la section **Pages** (dans le menu de gauche)
   - Dans **Source**, sélectionnez **Deploy from a branch**
   - Sélectionnez **main** comme branche
   - Sélectionnez **/ (root)** comme dossier
   - Cliquez sur **Save**

3. **Attendez le déploiement :**
   - GitHub va automatiquement déployer votre site
   - Cela prend 2-5 minutes généralement
   - Une fois prêt, le lien sera : `https://shalom352.github.io/lead-form/`

## 🌐 Intégration dans Webflow

### Option 1 : IFrame (Recommandé)
```html
<iframe 
    src="https://shalom352.github.io/lead-form/" 
    width="100%" 
    height="800" 
    frameborder="0"
    style="border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
</iframe>
```

### Option 2 : Modal/Popup
```html
<!-- Bouton pour ouvrir le formulaire -->
<button onclick="openLeadForm()" class="cta-button">
    Demander un devis
</button>

<!-- Script pour ouvrir en modal -->
<script>
function openLeadForm() {
    // Créer la modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="position: relative; width: 100%; max-width: 800px; height: 90vh;">
            <button onclick="this.closest('div').remove()" 
                    style="position: absolute; top: 10px; right: 10px; 
                           background: #FF5733; color: white; border: none; 
                           border-radius: 50%; width: 40px; height: 40px; 
                           cursor: pointer; z-index: 10000;">✕</button>
            <iframe src="https://shalom352.github.io/lead-form/" 
                    width="100%" height="100%" frameborder="0"
                    style="border-radius: 16px; background: white;"></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
}
</script>
```

### Option 3 : Nouvelle fenêtre
```html
<button onclick="window.open('https://shalom352.github.io/lead-form/', '_blank', 'width=900,height=800')" 
        class="cta-button">
    Remplir le formulaire
</button>
```

## 🎨 Personnalisation pour Webflow

### CSS pour l'iframe responsive :
```css
.lead-form-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.lead-form-iframe {
    width: 100%;
    height: 800px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .lead-form-iframe {
        height: 700px;
    }
}
```

### HTML dans Webflow :
```html
<div class="lead-form-container">
    <iframe 
        src="https://shalom352.github.io/lead-form/" 
        class="lead-form-iframe"
        loading="lazy">
    </iframe>
</div>
```

## 🔄 Communication entre Webflow et le formulaire

Le formulaire peut communiquer avec la page parent via `postMessage`. 

### Pour fermer automatiquement un modal après soumission :
```javascript
// Dans Webflow
window.addEventListener('message', function(event) {
    if (event.data.action === 'closeForm') {
        // Fermer la modal ou rediriger
        document.querySelector('.lead-form-modal').remove();
    }
});
```

## ⚙️ Configuration ClickUp

Assurez-vous que votre configuration ClickUp est correcte dans le fichier `js/clickup-integration.js` :

```javascript
const CLICKUP_CONFIG = {
    apiToken: 'VOTRE_TOKEN_CLICKUP',
    lists: {
        dubai: 'VOTRE_LIST_ID_DUBAI',
        ci: 'VOTRE_LIST_ID_CI'
    }
};
```

## 🚀 Mise à jour du formulaire

Pour mettre à jour le formulaire :
1. Modifiez les fichiers localement
2. Commitez les changements : `git commit -am "Update form"`
3. Poussez sur GitHub : `git push origin main`
4. GitHub Pages se met à jour automatiquement (2-5 minutes)

## 📞 Support

- Repository : https://github.com/Shalom352/lead-form
- Issues : https://github.com/Shalom352/lead-form/issues