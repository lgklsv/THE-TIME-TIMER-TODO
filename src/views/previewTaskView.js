import View from "./View";

class PreviewTaskView extends View {
    _parentElement = '';

    _generateMarkup() {
        return ` 
            <div class="task">
                <label class="checkbox" for="taskCheckbox1">
                    <input
                        class="checkbox-input"
                        type="checkbox"
                        name="taskCheckboxName"
                        id="taskCheckbox1"
                    />
                <div class="checkbox-box"></div>
                </label>
                <div class="task-grid">
                    <div class="task-desc">
                        <p class="task-title">read e-book 100 pages</p>
                        <p class="task-subtitle">Daily</p>
                    </div>
                    <div class="task-counter">0/3</div>
                    <div class="task-settigs text-btn icon">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
            </div>
        `;
    }
}

export default new PreviewTaskView();